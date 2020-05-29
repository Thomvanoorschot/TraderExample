import React, {Component} from 'react';
import {NavMenu} from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div className={"flex"}>
                <NavMenu/>
                <div className={"flex-row"}>
                    <div className={"content dark"}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
