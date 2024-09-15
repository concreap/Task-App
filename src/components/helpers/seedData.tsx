const tasks = [
    {
        name: 'Task-1',
        id: 'task-1',
        content: 'Take out the garbage',
        column: 'col-1'
    },
    {
        name: 'Task-2',
        id: 'task-2',
        content: 'Watch my favourite show',
        column: 'col-1'
    },
    {
        name: 'Task-3',
        id: 'task-3',
        content: 'Charge my phone',
        column: 'col-1'
    },
    {
        name: 'Task-4',
        id: 'task-4',
        content: 'Cook dinner',
        column: 'col-1'
    },
]

const seedData = {
    tasks: tasks,
    columns: [
        {
            title: 'To-do',
            id: 'col-1',
            tasks: [...tasks]
        },
        {
            title: 'In-Progress',
            id: 'col-2',
            tasks: []
        },
        {
            title: 'Done',
            id: 'col-3',
            tasks: []
        },
    ],
    order: ['col-1', 'col-2', 'col-3']
}

export default seedData;