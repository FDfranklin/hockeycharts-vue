<template>
    <div>
        <h1>Hockey Charts</h1>
        <div class="c-player-bar">
            <div class="c-player-bar_player" v-for="(player, key) in playerList" :key='key' :style="{'background-color': bgcolor[key]}">
                {{ player.name }}
                <div class="c-player-bar_pop" v-on:click="$delete(playerList, key)">x</div>
            </div>
        </div>
        <PlayerSearch @onPlayerSelect='onPlayerSelect' />
        <div>
            <span v-for='stat in displayedStats' :key='stat.stat'>
                <label :for="stat.stat">{{ stat.label }}</label>
                <input :id='stat.stat' type="checkbox" v-model='stat.enabled'>
            </span>
        </div>
        <div class="c-chart c-goals">
            <bar-chart
                v-for='stat in enabledStats'
                :key='stat.stat'
                :chart-data="getChartData(stat.stat)"
                :options="chartOptions"
                class="c-chart_card"
                :class="chartWidth"
            />
        </div>
    </div>
</template>

<script>
import PlayerSearch from '@/components/PlayerSearch';
import BarChart from '@/components/BarChart';
import { getStats } from '@/request';
import availableStats from '@/constants/stats';

const DEFAULT_STATS = [
    'goals',
    'assists',
    'points',
    'shots'
];

const CHART_OPTIONS = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
            },
            gridLines: {
                display: false
            }
        }],
        xAxes: [{
            gridLines: {
                display: false
            }
        }],
    },
    legend: {
        display: false
    }
};

const CHART_COLORS = [
    '#387ca3',
    '#55c39e',
    '#08605F',
    '#A2AD59',
    '#8E936D'
];

var unCamel = str => {
    var out = str.replace(/^[a-z]|[^\s][A-Z]/g, function(str, offset) {
        return (offset == 0 ) ? str.toUpperCase() : str.substr(0,1) + " " + str.substr(1).toUpperCase();
    });
    return(out);
}

export default {
    name: 'PlayerCompare',

    components: {
        PlayerSearch,
        BarChart
    },

    computed: {
        enabledStats() {
            return this.displayedStats.filter(stat => stat.enabled);
        },
        chartWidth() {
            return this.playerList.length > 2 ? 'c-chart_l-2' : 'c-chart_l-3';
        }
    },

    data() {
        return {
            playerList: [],
            chartData: {
                goals: {},
                assists: {},
                points: {},
                shots: {}
            },
            chartOptions: CHART_OPTIONS,
            bgcolor: CHART_COLORS,
            displayedStats: availableStats.map(stat => ({
                stat,
                label: unCamel(stat),
                enabled: DEFAULT_STATS.includes(stat)
            }))
        }
    },

    methods: {
        onPlayerSelect({ id, name }) {
            getStats(id)
                .then(response => {
                    this.parsePlayer(response, name);
                });
        },

        parsePlayer(response, name) {
            const { stat } = response.stats[0].splits[0];
    
            const player = {
                name,
                ...stat
            };

            this.playerList.push(player);
        },

        getChartData(stat) {
            return {
                labels: this.playerList.map(player => player.name),
                datasets: [{
                    label: unCamel(stat),
                    backgroundColor: CHART_COLORS,
                    data: this.playerList.map(player => player[stat])
                }]
            };
        }
    }
}
</script>

<style lang="scss" scoped>
.c-chart {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 4em;

    &_card {
        background: rgb(255, 255, 255);
        box-shadow: 0 0 40px hsla(0,0%,88.6%,.5);
        border-radius: 6px;
        display: block;
        margin-bottom: 2em;
        padding: 15px;
        transition: all .2s ease;
        z-index: 5;

        &:hover {
            box-shadow: 0 0 20px rgba(0,0,0,.5);
        }
    }

    &_l-2 {
        width: calc(100% / 1 - 3em);

        @media (min-width: 768px) {
            width: calc(100% / 2 - 3em);
        }
    }

    &_l-3 {
        width: calc(100% / 1 - 3em);

        @media (min-width: 768px) {
            width: calc(100% / 3 - 3em);
        }
    }
}

.c-player-bar {
    align-items: center;
    display: flex;
    justify-content: center;
    width: 100%;

    &_player {
        background: rgb(255, 255, 255);
        border-radius: 6px;
        color: #fff;
        margin: 0 5px;
        padding: 10px 25px;
        position: relative;
    }

    &_pop {
        content: 'x';
        cursor: pointer;
        font-size: 12px;
        position: absolute;
        padding: 3px 5px;
        right: 0;
        top: 0;
    }
}
</style>