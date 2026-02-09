import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { EmailLoginDto, RegisterDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // 注册限制: 每分钟5次
  @ApiOperation({ summary: '用户注册' })
  @ApiResponse({ status: 200, description: '注册成功' })
  @ApiResponse({ status: 400, description: '参数错误' })
  @ApiResponse({ status: 401, description: '邮箱已被注册' })
  @ApiBody({ type: RegisterDto })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @Throttle({ default: { limit: 10, ttl: 60000 } }) // 登录限制: 每分钟10次
  @ApiOperation({ summary: '邮箱登录' })
  @ApiResponse({ status: 200, description: '登录成功' })
  @ApiResponse({ status: 401, description: '邮箱或密码错误' })
  @ApiBody({ type: EmailLoginDto })
  async login(@Body() loginDto: EmailLoginDto) {
    return this.authService.emailLogin(loginDto);
  }

  @Get('wechat/qrcode')
  @Throttle({ default: { limit: 20, ttl: 60000 } }) // 获取二维码限制: 每分钟20次
  @ApiOperation({ summary: '获取微信登录二维码' })
  @ApiResponse({ status: 200, description: '成功返回二维码URL' })
  async getWechatQRCode() {
    return this.authService.getWechatQRCode();
  }

  @Post('wechat/callback')
  @Throttle({ default: { limit: 10, ttl: 60000 } }) // 微信回调限制: 每分钟10次
  @ApiOperation({ summary: '微信登录回调' })
  @ApiResponse({ status: 200, description: '登录成功' })
  async wechatCallback(@Body() body: { code: string; state: string }) {
    // TODO: 调用微信API获取用户信息
    // const userInfo = await this.getWechatUserInfo(body.code);
    // return this.authService.validateWechatUser(openid, userInfo);
    return {
      message: '微信登录功能待完善，需要配置微信开放平台',
    };
  }

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取当前用户信息' })
  @ApiResponse({ status: 200, description: '成功返回用户信息' })
  @ApiResponse({ status: 401, description: '未授权' })
  getProfile(@Request() req) {
    return req.user;
  }
}
