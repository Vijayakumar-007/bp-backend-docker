import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root/root';
import Amplify from "aws-amplify";
import 'typeface-roboto'

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: "us-west-2",
        userPoolId: 'eu-west-2_iLS3iv4Ei',
        userPoolWebClientId: '34ciudljc0s4h0scnr46o5jm7v',
    },
});

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
