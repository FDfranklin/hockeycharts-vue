<template>
    <div>
        <div class="c-player-search">
            <input class="c-player-search_input" type="text" v-model="search" placeholder="Search for players"/>
            <ul class="c-player-search_autofill">
                <li
                    class="c-player-search_li"
                    v-for="player in filteredRoster"
                    @click="onPlayerSelect(player.person.id, player.person.fullName)"
                    :key="player.person.id"
                >
                    <div class="c-player-search_players">
                        {{ player.person.fullName }}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getRoster } from '@/request';

export default {
    data: function () {
        return {
            roster: [],
            search: '',
            playerId: '',
            playerList: [],
            playerName: [],
            goaldata: null,
            assistdata: null,
            pointsdata: null,
            shotsdata: null,
            chartclass: 'c-chart_card'
        }
    },
    methods: {
        onPlayerSelect(id, name) {
            this.$emit('onPlayerSelect', { id, name });
            this.search = '';
        }
    },
    mounted() {
        // Get entire leagure roster
        // Issues: some of the numbers are old teams with no rosters
        // Example: 11 = Atlanta Trashers
        // Todo: Code still works but need to find a way to not get any console errors.
        var n = 1;
        while (n <= 31) {
            getRoster(n)
                .then(response => {
                    this.roster = this.roster.concat(response.teams[0].roster.roster);
                });
            n++;
        }
    },
    computed: {
        filteredRoster() {
            // Filter results
            if (this.search.length <= 3) {
                
            } else {
                return this.roster.filter(list => {
                    return list.person.fullName.toLowerCase().includes(this.search.toLowerCase())
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.c-player-search {
    max-width: 350px;
    position: relative;

    &_input {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #000;
        font-size: 20px;
        padding: 5px 10px;
        width: 100%;
    }
    
    &_autofill {
        background-color: #fff;
        border-left: 1px solid #000;
        border-right: 1px solid #000;
        list-style-type: none;
        margin: 0;
        padding: 0; 
        position: absolute;
        width: 100%;
        z-index: 99;
    }

    &_li {
        cursor: pointer;
        text-align: left;

        &:hover {
            background-color: #cccccc54;
        }

        &:last-of-type {
            border-bottom: 1px solid #000;
        }
    }

    &_li:not(:last-of-type) .c-player-search_players {
        border-bottom: 1px solid #cccccc54;
    }

    &_players { 
        margin: 0 5px;
        padding: 10px;
    }
}
</style>