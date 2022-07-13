import { Injectable } from '@nestjs/common';
import { Todo } from "../interfaces/todo";
import { TodoEntity } from "./todo.entity";

@Injectable()
export class TodoService {
  todosItems: Todo[] = [{id:"randoomId1", name:"RandomName1", isDone:false
  }, {id:"randoomId2", name:"RandomName2", isDone:false},{id:"randoomId3", name:"RandomName3", isDone:false}];

  async getAll(): Promise<TodoEntity[]>{
    return TodoEntity.find();

  }

  async getOne(id: string): Promise<TodoEntity | string>{
    const findedItem = await TodoEntity.findBy({ id });

    if(findedItem.length < 1){
      return 'no todo with this index'
    }
    return findedItem[0]
  }
  async toogle(id: string): Promise<TodoEntity | string>{
    const findedItem = await TodoEntity.findBy({ id });
    if(findedItem.length < 1){
      return 'no todo with this index'
    }
    findedItem[0].isdone = !findedItem[0].isdone;
    await findedItem[0].save();
    return findedItem[0]
  }
  async add(name){
    const newTOdoEntity = new TodoEntity();
    newTOdoEntity.name = name;
    newTOdoEntity.isdone = false;
    await newTOdoEntity.save();
    return newTOdoEntity.id;
  }
  async delete(id:string){
    const findedItem = await TodoEntity.findBy({ id });
    if(findedItem.length < 1){
      return 'no todo with this index'
    }
    await findedItem[0].remove();

  }
}
