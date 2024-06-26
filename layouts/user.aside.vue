<template>
    <div class="min-h-screen grid grid-cols-[300px_calc(100svw-300px)] grid-rows-[69px_1fr]">
        <Aside className="row-span-2 flex flex-col">
            <AsideLink to="/u/transactions">
                <Icon name="icon-park-solid:transaction-order" />
                Transactions
            </AsideLink>
        </Aside>
        <NavUser />
        <slot />
    </div>
</template>