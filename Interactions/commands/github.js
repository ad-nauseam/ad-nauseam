module.exports = async (client) => {
return await client.api.applications(client.user.id).guilds('806550877439131660').commands.post({
    data: {
        name: 'github',
        description: 'GitHub slash command',
        options: [
            {
                name: 'search',
                description: 'Search for something on Github',
                type: 2,
                options: [
                    {
                        name: 'repo',
                        description: 'Search for a repo on GitHub',
                        type: 1,
                        options: [
                            {
                                name: 'author',
                                description: 'Author of the GH Repo',
                                type: 3,
                                required: true
                            },
                            {
                                name: 'repo',
                                description: 'GitHub repo name',
                                type: 3,
                                required: true
                            }
                        ]
                    },
                    {
                        name: 'issue',
                        description: 'Search for an issue/pr on GitHub',
                        type: 1,
                        options: [
                            {
                                name: 'author',
                                description: 'Author of the GH Repo',
                                type: 3,
                                required: true
                            },
                            {
                                name: 'repo',
                                description: 'GitHub repo name',
                                type: 3,
                                required: true
                            },
                            {
                                name: 'number',
                                description: 'Issue or PR #',
                                type: 4,
                                required: true
                            }
                        ]
                    },
                    {
                        name: 'commit',
                        description: 'Search for commit on GitHub',
                        type: 1,
                        options: [
                            {
                                name: 'author',
                                description: 'Author of the GH Repo',
                                type: 3,
                                required: true
                            },
                            {
                                name: 'repo',
                                description: 'GitHub repo name',
                                type: 3,
                                required: true
                            },
                            {
                                name: 'commit',
                                description: 'Commit hash',
                                type: 3,
                                required: true
                            }
                        ]
                    }
                ]
            }
        ]
    }
})
}