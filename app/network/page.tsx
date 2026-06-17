import { NetworkBanner } from '@/components/network/NetworkBanner';
import { NetworkDirectory } from '@/components/network/NetworkDirectory';
import { getNetworkMembers } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export default async function NetworkPage() {
  const members = await getNetworkMembers();

  return (
    <>
      <NetworkBanner />
      <NetworkDirectory members={members} />
    </>
  );
}
