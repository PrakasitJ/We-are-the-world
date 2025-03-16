import { router } from "expo-router";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  uuid: string;
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  tel: string;
  salt: string;
  profile_image_url: string;
  createdAt: string;
  updatedAt: string;
};

type UserRegister = {
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  tel: string;
};

export type AuthLocalStorage = {
  user: User;
  isLoggedIn: boolean;
  error: string;
};

type Auth = {
  user: User;
  isLoggedIn: boolean;
  error: string;
  login: (emailOrPassword: string, password: string) => void;
  logout: () => void;
  register: (user: UserRegister) => void;
  getUser: () => User;
  updateUser: (uuid : string, user: Partial<User>) => void;
  setErrorMessage: (error: string) => void;
};

const asyncStorageAdapter = {
  getItem: async (name: string) => {
    const value = await AsyncStorage.getItem(name);
    return value;
  },
  setItem: async (name: string, value: string) => {
    await AsyncStorage.setItem(name, value);
  },
  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  },
};

const useAuth = create<Auth>()(
  persist(
    (set, get) => ({
      user: defaultUser(),
      isLoggedIn: false,
      error: "",
      login: async (usernameOrEmail, password) => {
        const user = await Login(usernameOrEmail, password);
        if (user.error) {
          set(() => ({
            user: defaultUser(),
            isLoggedIn: false,
            error: user.error,
          }));
        } else {
          set(() => ({
            user,
            isLoggedIn: true,
            error: "",
          }));
          router.dismissAll();
          router.replace("/(home)");
        }
      },
      logout: () => {
        set(() => ({
          user: defaultUser(),
          isLoggedIn: false,
        }));
      },
      register: async (user) => {
        const data = await Register(user);
        if (data.username) {
          set(() => ({
            user: data,
            isLoggedIn: true,
            error: "",
          }));
          router.dismissAll();
          router.replace("/(home)");
        } else {
          console.table(data);
          set(() => ({
            user: defaultUser(),
            isLoggedIn: false,
            error:
              (data.message
                ? `${data.message} ${data.property.replace("/", "")}`
                : false) ||
              data.format ||
              data.maxLength ||
              data.minLength ||
              data.required ||
              data.type ||
              data.unique,
          }));
        }
      },
      getUser: () => get().user,
      updateUser: async (uuid, user) => {
        const data = await UpdateUser(uuid, user);
        if (data.username) {
          set(() => ({
            user: data,
            isLoggedIn: true,
            error: "",
          }));
        } else {
          set(() => ({
            error:
              (data.message
                ? `${data.message} ${data.property.replace("/", "")}`
                : false) ||
              data.format ||
              data.maxLength ||
              data.minLength ||
              data.required ||
              data.type ||
              data.unique,
          }));
        }
      },
      setErrorMessage: (error: string) => {
        set(() => ({
          error: error,
        }));
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        error: state.error,
      }),
      storage: createJSONStorage(() => asyncStorageAdapter),
    }
  )
);

function defaultUser() {
  return {
    uuid: "",
    username: "",
    email: "",
    password: "",
    name: "",
    surname: "",
    tel: "",
    salt: "",
    profile_image_url: "",
    createdAt: "",
    updatedAt: "",
  };
}

async function UpdateUser(uuid : string, user: Partial<User>) {
  const response = await fetch(`https://pmback.prakasitj.com/api/user/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uuid,
      ...user,
    }),
  });
  const data = await response.json();
  console.table(data);
  return data;
}

async function Login(usernameOrEmail: string, password: string) {
  const response = await fetch("https://pmback.prakasitj.com/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usernameOrEmail,
      password,
    }),
  });
  const user = await response.json();
  return user;
}

async function Register(user: UserRegister) {
  const response = await fetch("https://pmback.prakasitj.com/api/user/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
}
export default useAuth;
