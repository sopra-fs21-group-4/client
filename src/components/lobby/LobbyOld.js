import React from 'react';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Input';
import { withRouter } from 'react-router-dom';
import styles from './Lobby.module.css';
import styled from 'styled-components';
//---------------------------------------------------
const InputField = styled.input`
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  rgba(0, 0, 0, 0.6);
  /* Surface overlay */
background: rgba(33, 33, 33, 0.08);
border-radius: 4px 4px 0px 0px;
`;

class LobbyOld extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (
            <div className={styles.Base}>
                <div className={styles.TitleContainer}>
                    <div className={styles.Title}>Creating a new Game</div>
                    <div className={styles.Title}>
                        <div className={styles.RightTitle}>Do you even Meme?</div>
                    </div>
                </div>
                <div className={styles.SubTitle}> SoPra Group 04 </div>
                <div className={styles.Content}>
                    <div className={styles.ContentBox}>
                        <div className={styles.ContentTitle}>Lobby-Settings</div>
                        <div className={styles.Form}>
                            <table>
                                <tr>
                                    <th><div className={styles.Settings}>Lobby Name:</div></th>
                                    <td>
                                        <InputField
                                            placeholder="Enter here.."
                                            onChange={e => {
                                                this.handleInputChange('username', e.target.value);
                                            }} />
                                    </td>
                                </tr>
                                <tr>
                                    <th><div className={styles.Settings}>Subreddit:</div></th>
                                    <td>
                                        <InputField
                                            placeholder="Enter here.."
                                            onChange={e => {
                                                this.handleInputChange('username', e.target.value);
                                            }} />
                                    </td>
                                </tr>
                                <tr>
                                    <th><div className={styles.Settings}>Max. Players:</div></th>
                                    <td>
                                        <InputField
                                            placeholder="Enter here.."
                                            onChange={e => {
                                                this.handleInputChange('username', e.target.value);
                                            }} />
                                    </td>
                                </tr>
                                <tr>
                                    <th><div className={styles.Settings}>Lobby Key:</div></th>
                                    <td>
                                        <InputField
                                            placeholder="Enter here.."
                                            onChange={e => {
                                                this.handleInputChange('username', e.target.value);
                                            }} />
                                    </td>
                                </tr>
                                <tr>
                                    <th><div className={styles.Settings}>Round Timer:</div></th>
                                    <td>
                                        <InputField
                                            placeholder="Enter here.."
                                            onChange={e => {
                                                this.handleInputChange('username', e.target.value);
                                            }} />
                                    </td>
                                </tr>
                                <tr>
                                    <th><div className={styles.Settings}>Number of Rounds:</div></th>
                                    <td>
                                        <InputField
                                            placeholder="Enter here.."
                                            onChange={e => {
                                                this.handleInputChange('username', e.target.value);
                                            }} />
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className={styles.Content}>
                        <div className={styles.ContentBox}>
                            <div className={styles.ContentTitle}>Players in Lobby</div>
                            <div className={styles.PlayersList}>
                                <table responsive>
                                    <tr>
                                        <th>Player Name<hr class="solid"></hr></th>
                                        
                                        <th>Player Karma<hr class="solid"></hr></th>
                                        
                                    </tr>
                                        {Array.from({ length: 2 }).map((_, index) => (
                                            <tr><td key={index}>Table cell {index}<hr class="solid"></hr></td></tr>
                                        ))}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(LobbyOld);
