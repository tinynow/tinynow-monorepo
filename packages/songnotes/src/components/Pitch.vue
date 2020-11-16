<template>
<div class="canon-layout --tube tc pt3">
    <h2 class="fw800">
        Your playlists are born from a backstory, not an algorithm.
    </h2>

    <p class="canon-u-type--2 mt4">
        Make them personal again.
    </p>
    <p class="canon-u-type--2 mt2">
        Import Spotify playlists or curate a new mix. Add notes. Share.
    </p>
 
    <button
        class="canon-button canon-u-type--3 dib mt4 pill"
        type="button"
        aria-describedby="disclaimer"
        @click="createAccountClick"
    >
        Get Early Access*
    </button>
</div>
<p
    id="disclaimer"
    class="pa1 bg--dark text--light mt5"
>
    *This app is in alpha! I will do my best to avoid losing anything you save here, but please proceed with caution.
</p>
</template>
<style lang="scss">

@import './Button/button.scss';
</style>