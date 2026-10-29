<template>
    <router-link :to="{ name: 'home' }">
        <div class="h-screen bg-[#D9D9D9] font-[Montserrat]">
            <div class="relative">
                <h1 class="absolute top-6 left-80 z-50 text-[400px] font-black text-[#3A3535]">
                    404
                </h1>
                <h2
                    class="absolute -top-23.75 left-80 text-[400px] font-black text-[#B5A4A4] opacity-50"
                >
                    404
                </h2>
                <h2
                    class="absolute top-37 left-80 text-[400px] font-black text-[#8F5858] opacity-50"
                >
                    404
                </h2>
                <span class="absolute top-170 left-105 text-[80px] font-black text-white"
                    >Page not found</span
                >
            </div>
        </div>
    </router-link>
</template>
