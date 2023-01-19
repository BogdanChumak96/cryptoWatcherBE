import { Query, Req } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Controller, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { WatchListDTO } from './dto';
import { CreateAssetResponse } from './response';
import { WatchlistService } from './watchlist.service';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @ApiTags('API')
  @ApiResponse({
    status: 201,
    type: CreateAssetResponse,
  })
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createAsset(
    @Body() assetDTO: WatchListDTO,
    @Req() req,
  ): Promise<CreateAssetResponse> {
    const user = req.user;
    return await this.watchlistService.createAsset(user, assetDTO);
  }

  @ApiTags('API')
  @ApiResponse({
    status: 200,
  })
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteAsset(
    @Query('id') assetId: string,
    @Req() req,
  ): Promise<boolean> {
    const { id } = req.user;
    return this.watchlistService.deleteAsset(id, assetId);
  }
}
