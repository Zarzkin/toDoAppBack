import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { TodoEntity } from "./todo.entity";

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService){}
  @Get("/")
    async getAlltoDoes():Promise<TodoEntity[]>{
      return this.todoService.getAll()
    };
  @Post("/")
  async addTodo(@Body('name') body){
    const id = await this.todoService.add(body);
    return {
      messages: `new todo wit ${id} added`
    }
  }

  @Get("/:id")
  async getOneTodo(@Param('id') id:string){
    return this.todoService.getOne(id);
  }
  @Patch("/:id")
  async toggleToodo(@Param('id') id:string){
   return this.todoService.toogle(id)
  }
  @Delete('/:id')
  async deleteTodo(@Param('id') id:string){
   return await  this.todoService.delete(id);

  }


}
