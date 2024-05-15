import { instanceToPlain, plainToInstance } from "class-transformer";

export function entityToDtoTransform<Entity, Dto> (entity: Entity, Dto): Dto {

    const responsePlain = instanceToPlain(entity);
    const responseDto: Dto = plainToInstance(Dto, responsePlain);
        
    return responseDto;
}