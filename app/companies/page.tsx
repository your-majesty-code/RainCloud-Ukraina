import { NetworkBanner } from '@/components/network/NetworkBanner';
import { CompaniesDirectory } from '@/components/companies/CompaniesDirectory';
import { getCompanies } from '@/lib/queries';

// ISR: cached HTML + data, refreshed every 5 min.
export const revalidate = 300;

export default async function CompaniesPage() {
  const companies = await getCompanies();

  return (
    <>
      <NetworkBanner title="Companies & Organisations" />
      <CompaniesDirectory companies={companies} />
    </>
  );
}
