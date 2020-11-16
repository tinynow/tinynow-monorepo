<template>
<div id="nav"></div>
<router-view />
</template>

<script>
// import { useMachine } from '@xstate/vue';
// import { Machine } from 'xstate';
// // import authMachineDefinition from 

// const authMachine = Machine({
//     id: 'auth',
//     initial: 'idle',
//     states: {
//         idle: {
//             on: {
//                 LOADED: 'initializing',
//             },
//         },
//         initializing: {
//             on: {
//                 USER_FOUND: 'authenticated',
//                 NO_USER_FOUND: 'started',
//                 ERROR: 'error',
//             },
//         },
//         started: {
//             on: {
//                 LOGGED_IN: 'authenticated',
//             },
//         },
//         authenticated: {
//             on: {
//                 LOG_OUT: 'started',
//             },
//         },
//         error: {
//             on: {
//                 RETRY: 'initializing', 
//             },
//         },
//     },
// });
  

// export default {
//     setup() {
//         // start an XState service that last lifetime of the component.
//         const { state, send } = useMachine(toggleMachine);
//         return {
//             state,
//             send,
//         };
//     },
// };
</script>
