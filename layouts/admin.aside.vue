<template>
    <div class="min-h-screen grid grid-cols-[300px_calc(100svw-300px)] grid-rows-[69px_1fr]">
        <Aside className="row-span-2 flex flex-col">
            <AsideLink to="/a/users">
                <Icon name="ph:users-fill" />
                Users
            </AsideLink>
            <AsideLink to="/a/categories">
                <Icon name="bxs:category" />
                Categories
            </AsideLink>
            <AsideLink to="/a/subcategories">
                <Icon name="bxs:category-alt" />
                Subcategories
            </AsideLink>
        </Aside>
        <NavAdmin />
        <slot />
    </div>
</template>