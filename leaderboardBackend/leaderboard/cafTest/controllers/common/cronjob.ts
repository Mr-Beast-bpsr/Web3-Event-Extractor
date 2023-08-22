import { hash, hashSync } from 'bcryptjs';
import { Request, Response } from 'express';
let referralCodeGenerator = require('referral-code-generator');
var otpGenerator = require('otp-generator');
import { Country, State, City } from 'country-state-city';

import { v4 as uuidv4 } from "uuid";

import bcryptjs = require("bcryptjs");
bcryptjs.genSalt(10, function (err, salt) {
    bcryptjs.hash("B4c0/\/", salt, function (err, hash) {
        // Store hash in your password DB.
    });
});


import db from "../../models"
const MyQuery = db.sequelize;
const { QueryTypes } = require('sequelize');
const { SECRET_KEY } = require('../../appconfig')
const jwt = require('jsonwebtoken')
import commonController from './common.controller';
import { body, Result } from 'express-validator';
import { exists } from 'fs';
import { Encrypt } from './encryptpassword';
import { error } from 'console';
import { TokenExpiredError } from 'jsonwebtoken';
const LogsDecoder = require('logs-decoder'); // NodeJS
const abi = require("../common/abi.json")
const web3 = require('web3')
import axios from 'axios';
import Web3 from 'web3'

class Cronjob {
    async weeklyCron() {
        try {


            var checking = await db.Blocks.findOne({
                where: {
                    id: 1
                }
            })
            //   Web3 = require('Web3')
            const web3 = new Web3('https://bsc-dataseed1.binance.org/')
            let arra: any = []
            await web3.eth.getBlockNumber().then(block => {

                arra.push(block)

            })

            var block = web3.eth.getBlock('latest')
            block.then()

            await MyQuery.query(`Update Blocks set Previous=${checking.current} where id=1`,
                { type: QueryTypes.UPDATE });
            await MyQuery.query(`Update Blocks set current=${arra[0]} where id=1`,
                { type: QueryTypes.UPDATE });
            var checking1 = await db.Blocks.findOne({
                where: {
                    id: 1
                }
            })

            console.log(checking1.Previous, arra[0], "av")
            const logsDecoder = await LogsDecoder.create();
            logsDecoder.addABI(abi);
            let res = await axios.get(`https://api.covalenthq.com/v1/bsc-mainnet/events/topics/0xb2dee5f49e7a09a5d7c95cd4dd5dc6410eea65d4e14519d6d3a6e14c8cf0e0e9/?key=ckey_3f199a2ca134447e8234e4f81cc&starting-block=${checking1.Previous}&ending-block=latest&page-size=10000000`)

            let items = (res.data.data.items)
            console.log(items.length, "items")

            await MyQuery.query(`DELETE FROM Weeklys`,
                { type: QueryTypes.DELETE });
            let totals: any = {}
            let refers: any = {}
            let decodedItems: any = []

            items.map(item => {
                // console.log(item,"bsdk")
                const decoded = web3.eth.abi.decodeLog([
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                    item.raw_log_data,
                    item.raw_log_topics.slice(1));
                // console.log(decoded);
                decodedItems.push(decoded);

            })
            decodedItems.forEach(tx => {
                const amount = tx.amount;
                if (totals[tx.to]) {
                    totals[tx.to] += Number(tx.amount / 1e18);
                    refers[tx.to] += 1
                } else {
                    refers[tx.to] = 1

                    totals[tx.to] = Number(tx.amount / 1e18);
                }
            })
            let sortedData = Object.entries(totals)
                .sort((a, b) => Number(b[1]) - Number(a[1]))
            console.log(sortedData[0])
            let sortedRefsR: any = Object.entries(refers).sort((a: any, b: any) => Number(b[1] - Number(a[1])))


            for (let i = 0; i < sortedData.length; i++) {
                const newarray = sortedData;

                let moon = newarray[i]
                let add = moon[0]
                let price = moon[1]
                // console.log(add, price, "add")

                var check = await db.Weeklys.create({

                    address: add,
                    amount: price,
                    rank: i + 1
                })
            }
            var sqlQuery = `SELECT SUM(amount) as total FROM Weeklys;`
            var total = await MyQuery.query(sqlQuery, { type: QueryTypes.SELECT });
            console.log(total[0].total, "uu")
            var a = 0.35 / 100;
            var b = 0.25 / 100;
            var c = 0.10 / 100;
            var d = 0.10 / 100;
            var e = 0.075 / 100;
            var f = 0.075 / 100;
            var g = 0.005 / 100;

            var first = total[0].total * a
            var second = total[0].total * b
            var third = total[0].total * c
            var fourth = total[0].total * d
            var fifth = total[0].total * e
            var sixth = total[0].total * f
            var seven = total[0].total * g

            await MyQuery.query(`UPDATE Weeklys SET bonus = ${first} WHERE rank =1`, { type: QueryTypes.UPDATE });
            await MyQuery.query(`UPDATE Weeklys SET bonus = ${second} WHERE rank =2`, { type: QueryTypes.UPDATE });
            await MyQuery.query(`UPDATE Weeklys SET bonus = ${third} WHERE rank =3`, { type: QueryTypes.UPDATE });
            await MyQuery.query(`UPDATE Weeklys SET bonus = ${fourth} WHERE rank =4`, { type: QueryTypes.UPDATE });
            await MyQuery.query(`UPDATE Weeklys SET bonus = ${fifth} WHERE rank =5`, { type: QueryTypes.UPDATE });
            await MyQuery.query(`UPDATE Weeklys SET bonus = ${sixth} WHERE rank =6`, { type: QueryTypes.UPDATE });
            await MyQuery.query(`UPDATE Weeklys SET bonus = ${seven} WHERE rank =7`, { type: QueryTypes.UPDATE });


            // refer of week 


            for (let i = 0; i < sortedRefsR.length; i++) {
                const newarray = sortedRefsR;

                let moon = newarray[i]
                let add = moon[0]
                let price = moon[1]


                // check if add is null or undefined
                if (add == null) {
                    console.log("Skipping null value");
                    continue; // skip to the next iteration of the loop
                }
                await MyQuery.query(`UPDATE Weeklys SET refer = ${price} WHERE address = '${add}'`,
                    { type: QueryTypes.UPDATE });

            }

        } catch (e) {
            console.log(e)

        }
    }
    async monthlyCron() {
        try {


            var checking = await db.Blocks.findOne({
                where: {
                    id: 2
                }
            })
            //   Web3 = require('Web3')
            const web3 = new Web3('https://bsc-dataseed1.binance.org/')
            let arra: any = []
            await web3.eth.getBlockNumber().then(block => {

                arra.push(block)

            })

            var block = web3.eth.getBlock('latest')
            block.then()

            await MyQuery.query(`Update Blocks set Previous=${checking.current} where id=2`,
                { type: QueryTypes.UPDATE });
            await MyQuery.query(`Update Blocks set current=${arra[0]} where id=2`,
                { type: QueryTypes.UPDATE });
            var checking1 = await db.Blocks.findOne({
                where: {
                    id: 2
                }
            })

            console.log(checking1.Previous, arra[0], "av")
            const logsDecoder = await LogsDecoder.create();
            logsDecoder.addABI(abi);
            let res = await axios.get(`https://api.covalenthq.com/v1/bsc-mainnet/events/topics/0xb2dee5f49e7a09a5d7c95cd4dd5dc6410eea65d4e14519d6d3a6e14c8cf0e0e9/?key=ckey_3f199a2ca134447e8234e4f81cc&starting-block=${checking1.Previous}&ending-block=latest&page-size=10000000`)

            let items = (res.data.data.items)
            console.log(items.length, "items")

            await MyQuery.query(`DELETE FROM Monthlys`,
                { type: QueryTypes.DELETE });
            let totals: any = {}
            let refers: any = {}
            let decodedItems: any = []

            items.map(item => {
                // console.log(item,"bsdk")
                const decoded = web3.eth.abi.decodeLog([
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                    item.raw_log_data,
                    item.raw_log_topics.slice(1));
                // console.log(decoded);
                decodedItems.push(decoded);

            })
            decodedItems.forEach(tx => {
                const amount = tx.amount;
                if (totals[tx.to]) {
                    totals[tx.to] += Number(tx.amount / 1e18);
                    refers[tx.to] += 1
                } else {
                    refers[tx.to] = 1

                    totals[tx.to] = Number(tx.amount / 1e18);
                }
            })
            let sortedData = Object.entries(totals)
                .sort((a, b) => Number(b[1]) - Number(a[1]))
            console.log(sortedData[0])
            let sortedRefsR: any = Object.entries(refers).sort((a: any, b: any) => Number(b[1] - Number(a[1])))


            for (let i = 0; i < sortedData.length; i++) {
                const newarray = sortedData;

                let moon = newarray[i]
                let add = moon[0]
                let price = moon[1]
                // console.log(add, price, "add")

                var check = await db.Monthlys.create({

                    address: add,
                    amount: price,
                    rank: i + 1
                })
            }
            var sqlQuery = `SELECT SUM(amount) as total FROM Monthlys;`
            var total = await MyQuery.query(sqlQuery, { type: QueryTypes.SELECT });
            console.log(total[0].total, "uu")
            var a = 0.35 / 100;
            var b = 0.25 / 100;
            var c = 0.10 / 100;
            var d = 0.10 / 100;
            var e = 0.075 / 100;
            var f = 0.075 / 100;
            var g = 0.005 / 100;

            var first = total[0].total * a
            var second = total[0].total * b
            var third = total[0].total * c
            var fourth = total[0].total * d
            var fifth = total[0].total * e
            var sixth = total[0].total * f
            var seven = total[0].total * g

            await MyQuery.query(`UPDATE Monthlys SET bonus = ${first} WHERE rank =1`, { type: QueryTypes.UPDATE });
            await MyQuery.query(`UPDATE Monthlys SET bonus = ${second} WHERE rank =2`, { type: QueryTypes.UPDATE });
            await MyQuery.query(`UPDATE Monthlys SET bonus = ${third} WHERE rank =3`, { type: QueryTypes.UPDATE });
            await MyQuery.query(`UPDATE Monthlys SET bonus = ${fourth} WHERE rank =4`, { type: QueryTypes.UPDATE });
            await MyQuery.query(`UPDATE Monthlys SET bonus = ${fifth} WHERE rank =5`, { type: QueryTypes.UPDATE });
            await MyQuery.query(`UPDATE Monthlys SET bonus = ${sixth} WHERE rank =6`, { type: QueryTypes.UPDATE });
            await MyQuery.query(`UPDATE Monthlys SET bonus = ${seven} WHERE rank =7`, { type: QueryTypes.UPDATE });


            // refer of week 


            for (let i = 0; i < sortedRefsR.length; i++) {
                const newarray = sortedRefsR;

                let moon = newarray[i]
                let add = moon[0]
                let price = moon[1]


                // check if add is null or undefined
                if (add == null) {
                    console.log("Skipping null value");
                    continue; // skip to the next iteration of the loop
                }
                await MyQuery.query(`UPDATE Monthlys SET refer = ${price} WHERE address = '${add}'`,
                    { type: QueryTypes.UPDATE });

            }

        }  catch (e) {
            console.log(e)


        }
    
    
    }
}
export default new Cronjob();
// export default new hello();
