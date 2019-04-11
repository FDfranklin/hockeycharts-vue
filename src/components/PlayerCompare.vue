<template>
  <div>
    <h1>NHL Player Compare</h1>
    <div class="c-player-compare">
        <div class="c-player-compare_container">
            <div class="c-player-compare_input-container">
                <label class="c-player-compare_label">Select Team: </label>
                <select class="c-player-compare_select" v-model="selectedTeam" v-on:change="teamChange">
                    <option v-for="team in orderedTeams" v-bind:value="team.id" v-bind:key="team.id">
                        {{ team.name }}
                    </option>
                </select>
            </div>
            <div class="c-player-compare_input-container">
                <label class="c-player-compare_label">Select Player: </label>
                <select class="c-player-compare_select" v-model="selectedPlayer" v-on:change="playerChange">
                    <option v-for="player in orderedPlayers" v-bind:value="player.person.id" v-bind:key="player.person.id">
                        {{ player.person.fullName }}
                    </option>
                </select>
                <ul class="c-player-compare_list">
                    <li class="c-player-compare_list-item" v-for="(value, key) in playerResults" v-bind:key="value">
                        {{ key }}: {{ value }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import _ from 'lodash'

export default {
    data: function() { 
        return {
            teams: [],
            teamResults: [],
            playerResults: [],
            selectedTeam: [],
            selectedPlayer: ''
        }
    },
    methods: {
        teamChange() {
            axios.get('https://statsapi.web.nhl.com/api/v1/teams/' + this.selectedTeam + '/?expand=team.roster',).then(response => {
                this.teamResults = response.data.teams[0].roster.roster
            })
        },
        playerChange() {
            axios.get('https://statsapi.web.nhl.com/api/v1/people/' + this.selectedPlayer + '/stats/?stats=statsSingleSeason&season=20182019').then(response => {
                this.playerResults = response.data.stats[0].splits[0].stat
            })
        }
    },
    mounted() {
        axios.get('https://statsapi.web.nhl.com/api/v1/teams/',).then(response => {
            this.teams = response.data.teams
        })
    },
    computed: {
        orderedTeams: function() {
            return _.orderBy(this.teams, 'name')
        },
        orderedPlayers: function() {
            return _.orderBy(this.teamResults, 'person.fullName')
        }
    }
}
</script>
<style lang="scss">
.c-player-compare {
    
    &_container {
        width: 45%;
    }

    &_input-container {
        margin-bottom: 2em;
    }

    &_label {
    }

    &_select {
        border: none;
        border-bottom: 1px solid #ccc;
        width: 100%;
    }

    &_list {
        list-style-type: none;
        padding-left: 0;
    }
}
</style>