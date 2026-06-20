// ─── IPv4 subnet calculation helper ───────────────────────────────────────────

export function ipToNumber(ip: string): number {
  const parts = ip.split(".");
  if (parts.length !== 4) throw new Error("Invalid IP format");
  return parts.reduce((acc, octet) => {
    const n = parseInt(octet, 10);
    if (isNaN(n) || n < 0 || n > 255) throw new Error(`Invalid octet: ${octet}`);
    return (acc << 8) | n;
  }, 0) >>> 0;
}

export function numberToIp(num: number): string {
  const n = num >>> 0;
  return [
    (n >>> 24) & 0xff,
    (n >>> 16) & 0xff,
    (n >>> 8) & 0xff,
    n & 0xff,
  ].join(".");
}

export function cidrToSubnetMask(cidr: number): string {
  if (cidr < 0 || cidr > 32) throw new Error(`Invalid CIDR: ${cidr}`);
  const mask = cidr === 0 ? 0 : (0xffffffff << (32 - cidr)) >>> 0;
  return numberToIp(mask);
}

export function cidrToWildcardMask(cidr: number): string {
  if (cidr < 0 || cidr > 32) throw new Error(`Invalid CIDR: ${cidr}`);
  const mask = cidr === 0 ? 0xffffffff : (~(0xffffffff << (32 - cidr))) >>> 0;
  return numberToIp(mask);
}

export type SubnetResult = {
  networkAddress:   string;
  broadcastAddress: string;
  subnetMask:       string;
  wildcardMask:     string;
  firstUsableIp:    string;
  lastUsableIp:     string;
  totalHosts:       number;
  usableHosts:      number;
  cidr:             number;
};

export function calculateSubnet(ip: string, cidr: number): SubnetResult {
  if (cidr < 1 || cidr > 32) throw new Error("CIDR ต้องอยู่ระหว่าง 1-32");

  const ipNum   = ipToNumber(ip);
  const maskNum = (0xffffffff << (32 - cidr)) >>> 0;
  const netNum  = (ipNum & maskNum) >>> 0;
  const bcastNum = (netNum | (~maskNum >>> 0)) >>> 0;

  const totalHosts  = Math.pow(2, 32 - cidr);
  const usableHosts = cidr >= 31 ? totalHosts : Math.max(0, totalHosts - 2);

  const firstUsable = cidr >= 31 ? numberToIp(netNum) : numberToIp((netNum + 1) >>> 0);
  const lastUsable  = cidr >= 31 ? numberToIp(bcastNum) : numberToIp((bcastNum - 1) >>> 0);

  return {
    networkAddress:   numberToIp(netNum),
    broadcastAddress: numberToIp(bcastNum),
    subnetMask:       cidrToSubnetMask(cidr),
    wildcardMask:     cidrToWildcardMask(cidr),
    firstUsableIp:    firstUsable,
    lastUsableIp:     lastUsable,
    totalHosts,
    usableHosts,
    cidr,
  };
}

export function validateIpv4(ip: string): boolean {
  const parts = ip.trim().split(".");
  if (parts.length !== 4) return false;
  return parts.every((p) => {
    const n = parseInt(p, 10);
    return !isNaN(n) && n >= 0 && n <= 255 && String(n) === p;
  });
}
