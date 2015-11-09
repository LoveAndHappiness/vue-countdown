/*jslint browser: true, white: true*/
/*global Vue*/
(function () {
    'use strict'; 

    new Vue({
        el: '#demo',

        data: {
            startingValue: null,
            hasFinished: false,
            hasStarted: false,
            hasStopped: false,
            isAlarm: false
        },

        methods: {
            /**
             * Starts the Timer
             */
            startTimer: function (e) {
                e.preventDefault();

                if(!this.startingValue) {
                    return;
                }

                this.hasStarted = true;
                this.hasStopped = false;
                
                this.count();
            },

            /**
             * Executes setInterval Function
             */
            count: function () {
                var that = this;
                this.timer = setInterval(function () {
                    that.reduceTimer();
                    that.outputsValue();
                }, 1000);
            },

            /**
             * Reduces timer and sets props when finished
             */
            reduceTimer: function () {
                if(this.startingValue > 0) {
                    this.startingValue -= 1;
                }

                if(this.startingValue === 0) {
                    this.startAlarm();
                    this.stopTimer();
                    this.hasFinished = true;
                }
            },

            /**
             * Outputs value into HTML Element
             */
            outputsValue: function () {
                document.querySelector('#During__body').textContent = this.startingValue;
            },

            /**
             * Stops the timer by clearing the setInterval function
             */
            stopTimer: function () {
                clearInterval(this.timer);

                this.hasStopped = true;
            },

            /**
             * Starts alert
             */
            startAlarm: function () {
                this.isAlarm = true;
            },

            /**
             * Stops alert
             * @return {[type]} [description]
             */
            stopAlarm: function () {
                this.isAlarm = false;
            },

            /**
             * Restarts alert
             */
            restart: function () {
                this.startingValue = null;
                this.hasFinished   = false;
                this.hasStarted    = false;
                this.isRunning     = false;
                this.hasStopped    = false;
                this.isAlarm       = false;
            }
        }
    }); 
}());