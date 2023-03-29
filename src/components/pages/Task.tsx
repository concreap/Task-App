import React, { useEffect, useState } from 'react';
import { ITask } from '../utils/types';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ id, content, name, column, index }: ITask) => {

    useEffect(() => {

    }, [])

    return (
        <>
            <Draggable draggableId={id} index={index}>

                {(provided, snapshot) => (

                    <div className='task-item'
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    >
                        <span {...provided.dragHandleProps} className='handle'></span>
                        <p>{ content }</p>
                    </div>
                )}

            </Draggable>

        </>
    )

}

export default Task;