import React, {Component} from 'react';
import {Layout} from './components/Layout';
import CandlesChart from "./components/CandlesChart";
import './styling/General.css';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <CandlesChart/>
            </Layout>
        );
    }
}
