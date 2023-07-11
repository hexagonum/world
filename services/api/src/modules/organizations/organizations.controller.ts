import { Organization } from '@prisma/client';
import { Controller, Get, Path, Route, SuccessResponse, Tags } from 'tsoa';
import { OrganizationsService } from './organizations.service';

@Route('/organizations')
@Tags('Organizations')
export class OrganizationsController extends Controller {
  private organizationsService: OrganizationsService;

  constructor() {
    super();
    this.organizationsService = new OrganizationsService();
  }

  @Get()
  @SuccessResponse(200)
  async getOrganizations(): Promise<Organization[]> {
    return this.organizationsService.getOrganizations();
  }

  @Get(':code')
  @SuccessResponse(200)
  async getOrganization(@Path('code') code: string): Promise<Organization> {
    return this.organizationsService.getOrganization(code);
  }
}
