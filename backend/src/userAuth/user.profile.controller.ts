import { Controller, Get, Patch, Post, Delete, UseGuards, Request, Body, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from '../userAuth/guards/jwt-auth.guard';
import { UserProfileService } from './user.profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';



@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserProfileController {
  constructor(private readonly userService: UserProfileService) {}

  @Get('profile/me')
  getProfile(@Request() req) {
    return this.userService.getProfile(req.user.userId);
  }

  @Patch('profile/update')
  updateProfile(@Request() req, @Body() dto: UpdateProfileDto) {
    return this.userService.updateProfile(req.user.userId, dto);
  }

  @Post('change-password')
  changePassword(@Request() req, @Body() dto: ChangePasswordDto) {
    return this.userService.changePassword(req.user.userId, dto);
  }

  @Delete('delete-account')
  deleteAccount(@Request() req) {
    return this.userService.deleteAccount(req.user.userId);
  }

  @Post('profile/upload-image')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/profile-images',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, `${req.user}-${uniqueSuffix}${ext}`);
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        return cb(new BadRequestException('Only image files are allowed!'), false);
      }
      cb(null, true);
    },
    limits: { fileSize: 2 * 1024 * 1024 } 
  }))
  async uploadProfileImage(@Request() req, @UploadedFile() file: Express.Multer.File) {
    // Ideally you upload file to cloud storage (e.g. Cloudinary) here and get URL
    const imageUrl = `/uploads/profile-images/${file.filename}`;
    return this.userService.uploadProfileImage(req.user.userId, imageUrl);
  }
}
