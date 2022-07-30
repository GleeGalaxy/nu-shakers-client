<template>
    <div class="footer-wrapper">
        <div class="container">
            <div class="footer">
                <div>
                    <h1>NU SHAKERS</h1>
                    <h2>© Tumelo Lutaka {{new Date().getFullYear()}}</h2> 
                </div>
            </div>
        </div>
    </div>
</template>

<style>
h1, h2{
    text-align: center;
}

    .footer{
        display: grid;
        place-content: center;
        height: 100%;
    }

    .footer-wrapper{
        position: fixed;
        bottom: 0;
        height: 100px;
        width: 100%;
        padding: 0 10px;
        background-color: var(--secondary-clr);
        color: var(--primary-clr);
        box-sizing: border-box;
    }
</style>