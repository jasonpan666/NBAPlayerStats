import React from 'react';
import { DataViewContainer } from './DataViewContainer';
import nba from '../nba'
import { Profile } from './Profile';
import { SearchBar } from './SearchBar';
import { DEFAULT_PLAYER_INFO } from '../constants';

export class Main extends React.Component {

    state = {
        playerInfo: DEFAULT_PLAYER_INFO,
    }

    componentDidMount() {
        this.loadPlayerInfo(this.state.playerInfo.fullName);
    }

    loadPlayerInfo = (playerName) => {
        nba.stats.playerInfo({ PlayerID: nba.findPlayer(playerName).playerId }).then((info) => {
            const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
            this.setState({ playerInfo });
        });
    }

    render() {
        return (
            <div className="main">
                <SearchBar loadPlayerInfo={this.loadPlayerInfo}/>
                <div className="player">
                    <Profile playerInfo={this.state.playerInfo}/>
                    <DataViewContainer playerId={this.state.playerInfo.playerId}/>
                </div>
            </div>
        );
    }
}
