import { Controller, forwardRef, Get, HttpStatus, Inject, Req, Res } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { Request, Response } from 'express'
import { AssetStorageProvider } from "../../provider/AssetStorage.provider";

@Controller('nft_assets')
@ApiTags('NFT tokens distribution')
export class AssetMetadataController {

    constructor(
        @Inject(forwardRef(() => AssetStorageProvider))
            private provider: AssetStorageProvider
    ){}

    @Get(':tokenId')
    @ApiParam({
        type: Number,
        name: 'tokenId'
    })
    async getMetadata(
        @Req() request: Request<{ tokenId: string }, never, never, never>,
        @Res() response: Response
    ) {

        const { tokenId } = request.params

        try {

            const metadata = await this.provider.getMetadata(tokenId)

            return response.status(HttpStatus.OK)
                .json(metadata)

        } catch(ex) {

            return response.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ error: (ex as Error).toString(), tokenId })

        }

    }

}