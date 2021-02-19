const { Structures } = require('discord.js');

Structures.extend("GuildMember", GuildMember => class extends GuildMember {
    constructor(...args){
        super(...args)
        this.insert = async() => {
            return new Promise(async(resolve, reject) => {
                this.client.sql`select * from users where id = ${this.id}`.then(q => {
                    if(q.count > 0) return reject(new Error("User is already in the Database"))
                    this.client.sql`insert into users(id, balance) values(${this.id}, 50) returning *`.then(resolve)
                })
            })
        }
        this.balance = async() => {
            return new Promise(async(resolve, reject) => {
                let query = await this.client.sql`select * from users where id = ${this.id}`
                if(query.count == 0) query = await this.insert()
                resolve(query[0].balance)
            })
        }
        this.addBalance = async(amount) => {
            if(!amount) return reject("Please Provide an Amount")
            return new Promise(async(resolve, reject) => {
                if(isNaN(amount)) return reject("NaN");
                if(typeof amount == "string") amount = parseInt(amount)
                this.client.sql`select * from users where id = ${this.id}`.then(async(oldBalance) => {
                    if(oldBalance.count == 0) oldBalance = await this.insert()
                    await this.client.sql`update users set ${this.client.sql({ balance: oldBalance[0].balance += amount })} where id = ${this.id}`
                    resolve({ oldBalance: oldBalance[0].balance - amount, newBalance: oldBalance[0].balance})
                })
            })
        }
        this.deductBalance = async(amount) => {
            return new Promise(async(resolve, reject) => {
                if(!amount) return reject("Please Provide an Amount")
                if(isNaN(amount)) return reject("NaN");
                if(typeof amount == "string") amount = parseInt(amount)
                this.client.sql`select * from users where id = ${this.id}`.then(async(oldBalance) => {
                    if(oldBalance.count == 0) oldBalance = await this.insert()
                        if(oldBalance[0].balance - amount < 0){
                            reject(new Error("User doesn't have enough balance"))
                        }else{
                            await this.client.sql`update users set ${this.client.sql({ balance: oldBalance[0].balance -= amount })} where id = ${this.id}`
                            resolve({ oldBalance: oldBalance[0].balance + amount, newBalance: oldBalance[0].balance})
                        }
                });
            })
        }
    }
})
