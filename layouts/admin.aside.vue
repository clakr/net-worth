<template>
    <div class="min-h-screen grid grid-cols-[300px_calc(100svw-300px)] grid-rows-[69px_1fr]">
        <Aside className="row-span-2 flex flex-col">
            <Button to="/a/users" variant="subtle">
                Users
            </Button>
            <Button to="/a/categories" variant="subtle">
                Categories
            </Button>
            <Button to="/a/subcategories" variant="subtle">
                Subcategories
            </Button>
        </Aside>
        <NavAdmin />
        <slot />
    </div>
</template>