import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class JwtHandlerService {

    constructor(private jwtService: JwtService) {}

    createToken(data) {
        return this.jwtService.sign({data: data})
    }

    decodeToken(token) {
        const tokenData = token.slice(7);
        return this.jwtService.decode(tokenData);
    }
}
