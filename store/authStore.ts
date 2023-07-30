import create from 'zustand';
import { persist } from 'zustand/middleware';
import { BASE_URL } from '../utils';


const authStore = (set:any) => ({
    userProfile: null,
    allUsers: [],
    allPosts : [],
    allSortedPosts:  [],
    addUser: (user:any) => set({userProfile: user}),
    removeUser: () => set({userProfile: null}),
    fetchAllUsers: async () => {
        const response = await fetch(`${BASE_URL}/api/users`);
        const data = await response.json();
        set({ allUsers: data });
    },
    fetchAllPosts: async () => {
        const response = await fetch(`${BASE_URL}/api/hello`);
        const data = await response.json();
        set({allPosts: data});
    },
    fetchAllSortedPosts : async (category : any) => {
        const response  = await fetch(`${BASE_URL}/api/category/${category}`);
        const data = await response.json();
        set({allSortedPosts : data})
    }
})

const useAuthStore = create(
    persist(authStore, {
        name: "auth"
    })
)

// Allow to use useAuthStore as a hook in any component
export default useAuthStore; 