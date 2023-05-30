import { Controller, Get, Route, Tags } from 'tsoa';
import { OrganizationsService } from './organizations.service';
import { Organization } from '@prisma/client';

@Route('/organizations')
@Tags('Organizations')
export class OrganizationsController extends Controller {
  private organizationsService: OrganizationsService;

  constructor() {
    super();
    this.organizationsService = new OrganizationsService();
  }

  @Get()
  async getOrganizations(): Promise<Organization[]> {
    return this.organizationsService.getOrganizations();
  }
}
