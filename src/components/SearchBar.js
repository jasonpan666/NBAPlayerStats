import React from 'react';
import { AutoComplete, Input, Icon } from 'antd';
import nba from '../nba';
import { PROFILE_PIC_URL_PREFIX } from '../constants';

const Option = AutoComplete.Option;

export class SearchBar extends React.Component {
    state = {
        dataSource: [],
    }

    handleSearch = (value) => {
        console.log(value);
        this.setState({
            dataSource: !value ? [] : nba.searchPlayers(value).map(({ fullName, playerId }) =>
                <Option key={playerId} value={fullName}>
                    <img className="player-option-image" src={`${PROFILE_PIC_URL_PREFIX}/${playerId}.png`}/>
                    <span className="player-option-label">{fullName}</span>
                </Option>
            ),
        });
    }

    onSelect = (playerName) => {
        this.props.loadPlayerInfo(playerName);
    }

    render() {
        window.nba = nba;
        const { dataSource } = this.state;
        return (
            <AutoComplete
                className="search-bar"
                size="large"
                dataSource={dataSource}
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                placeholder="Search NBA Player"
                optionLabelProp="value"
            >
                <Input suffix={<Icon type="search" className="certain-category-icon" />} />
            </AutoComplete>
        );
    }
}
