export const pagesDbConfig = {
    dbName: 'pages_db',
    version: '1.0',
    tables: [
        {
            tableName: 'pages',
            option: {
                keyPath: 'id'
            },
            indexs: [
                {
                    key: 'id',
                    option: {
                        unique: true
                    }
                },
                {
                    key: 'data'
                }
            ]
        }
    ]
}

export const pagesDefaultData = {
    tableName: 'pages',
    id: 'pages_history',
    data: {}
}
