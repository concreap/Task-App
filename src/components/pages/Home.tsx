import React, { useEffect, useContext, useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';

import Column from './Column';
import TaskContext from '../../context/task/taskContext';
import { ISeedData, ITaskContext } from '../utils/types';

const Home = (props: any) => {

    const taskContext = useContext<ITaskContext>(TaskContext);

    useEffect(() => {

    }, [])

    const reposition = (data: Array<any>, from: number, to: number): Array<any> => {

        let temp: Array<any> = []
        let result: Array<any> = [];

        temp = [...data];

        // remove item from the {from} index and save
        const item = data.splice(from, 1)[0];

        if(item){

            result = [...data]; // spread out the remaining items
            result.splice(to, 0, item) // add the item back

        }else{
            result = [...temp]
        }

        return result;

    }

    const handleDragEnd = (result: any) =>{

        // result = {
        //     combine: null,
        //     destination: {
        //         droppableId: 'col-1',
        //         index: 0
        //     },
        //     source: {
        //         droppableId: 'col-1',
        //         index: 0
        //     },
        //     mode: 'FLUID',
        //     reason: 'DROP',
        //     draggableId: 'task-1',
        //     type: 'DEFAULT'
        // }

        const { destination, source, draggableId, type } = result;

        if(!destination){
            return;
        }

        if(destination.droppableId === source.droppableId && source.index === destination.index){
            return;
        }

        console.log('source',source)
        console.log('dest', destination)

        let currList: ISeedData = taskContext.seed;

        // source {column}
        const start = currList.columns.find((x) => x.id === source.droppableId);
        const sIndex = currList.columns.findIndex((x) => x.id === source.droppableId);

        // destination {column}
        const end = currList.columns.find((x) => x.id === destination.droppableId);
        const eIndex = currList.columns.findIndex((x) => x.id === destination.droppableId);

        if(start && end){

            const item = start.tasks.find((x) => x.id === draggableId)
            const itemIndex = start.tasks.findIndex((x) => x.id === draggableId)

            if(start.id === end.id && item){

                let startTasks = start.tasks;
                const result = reposition(startTasks, source.index, destination.index);

                start.tasks = result;

                currList.columns.splice(sIndex, 1, start);
                taskContext.setSeed(currList);

            }

            if(start.id !== end.id && item && itemIndex >= 0){

                let startTasks = start.tasks;
                let endTasks = end.tasks;

                startTasks.splice(itemIndex, 1);
                start.tasks = startTasks;

                endTasks.push(item);
                end.tasks = endTasks;

                currList.columns.splice(sIndex, 1, start);
                currList.columns.splice(eIndex, 1, end);

                taskContext.setSeed(currList);

            }

        }

    }

    return(
        <>
            <section className='section'>

                <DragDropContext
                onDragEnd={handleDragEnd}
                onDragStart={() => {}}
                onDragUpdate={() => {}}
                >

                    <div className='container'>

                        {
                            taskContext.seed && taskContext.seed.columns.length > 0 &&
                            taskContext.seed.columns.map((column, index) => {

                                return <Column key={column.id} id={column.id} title={column.title} tasks={column.tasks} />

                            })
                        }

                        

                    </div>

                </DragDropContext>

            </section>
        </>
    )

}

export default Home;