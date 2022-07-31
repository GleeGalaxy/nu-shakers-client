<template>
    <div>
        <h1>Profile</h1>
        <h2>First Name: {{`${$store.state.users.account.firstName} ${$store.state.users.account.lastName}`}}</h2>
        <h2>Account Type: {{$store.state.users.account.accountType}}</h2>
        <h2>Nickname: {{$store.state.users.account.nickname}}</h2>
        <h2>Games Played: {{$store.state.users.account.gamesPlayed}}</h2>
        <h2>Points: {{$store.state.users.account.points}}</h2>
    </div>
</template>
