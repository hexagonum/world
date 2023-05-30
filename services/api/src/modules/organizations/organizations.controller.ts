import { Controller, Get, Route, Tags } from 'tsoa';

@Route('/organizations')
@Tags('Organizations')
export class OrganizationsController extends Controller {
  @Get()
  getOrganizations() {
    return [];
  }
}
