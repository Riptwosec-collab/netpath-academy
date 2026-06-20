import { describe, it, expect } from "vitest";
import {
  ipToNumber,
  numberToIp,
  cidrToSubnetMask,
  cidrToWildcardMask,
  calculateSubnet,
  validateIpv4,
} from "@/lib/networkCalculations";

describe("ipToNumber", () => {
  it("converts 192.168.1.0 correctly", () => {
    expect(ipToNumber("192.168.1.0")).toBe(3232235776);
  });
  it("converts 0.0.0.0 to 0", () => {
    expect(ipToNumber("0.0.0.0")).toBe(0);
  });
  it("converts 255.255.255.255 to max uint32", () => {
    expect(ipToNumber("255.255.255.255")).toBe(4294967295);
  });
});

describe("numberToIp", () => {
  it("round-trips 192.168.1.1", () => {
    expect(numberToIp(ipToNumber("192.168.1.1"))).toBe("192.168.1.1");
  });
  it("converts 0 to 0.0.0.0", () => {
    expect(numberToIp(0)).toBe("0.0.0.0");
  });
});

describe("cidrToSubnetMask", () => {
  it("/24 → 255.255.255.0", () => {
    expect(cidrToSubnetMask(24)).toBe("255.255.255.0");
  });
  it("/16 → 255.255.0.0", () => {
    expect(cidrToSubnetMask(16)).toBe("255.255.0.0");
  });
  it("/8  → 255.0.0.0", () => {
    expect(cidrToSubnetMask(8)).toBe("255.0.0.0");
  });
  it("/32 → 255.255.255.255", () => {
    expect(cidrToSubnetMask(32)).toBe("255.255.255.255");
  });
  it("/0  → 0.0.0.0", () => {
    expect(cidrToSubnetMask(0)).toBe("0.0.0.0");
  });
});

describe("cidrToWildcardMask", () => {
  it("/24 → 0.0.0.255", () => {
    expect(cidrToWildcardMask(24)).toBe("0.0.0.255");
  });
  it("/16 → 0.0.255.255", () => {
    expect(cidrToWildcardMask(16)).toBe("0.0.255.255");
  });
});

describe("validateIpv4", () => {
  it("accepts valid IP", () => {
    expect(validateIpv4("192.168.1.1")).toBe(true);
    expect(validateIpv4("10.0.0.1")).toBe(true);
  });
  it("rejects invalid IP", () => {
    expect(validateIpv4("999.1.1.1")).toBe(false);
    expect(validateIpv4("abc")).toBe(false);
    expect(validateIpv4("192.168.1")).toBe(false);
    expect(validateIpv4("")).toBe(false);
  });
});

describe("calculateSubnet", () => {
  it("calculates 192.168.1.0/24 correctly", () => {
    const result = calculateSubnet("192.168.1.0", 24);
    expect(result.networkAddress).toBe("192.168.1.0");
    expect(result.broadcastAddress).toBe("192.168.1.255");
    expect(result.subnetMask).toBe("255.255.255.0");
    expect(result.totalHosts).toBe(256);
    expect(result.usableHosts).toBe(254);
    expect(result.firstHost).toBe("192.168.1.1");
    expect(result.lastHost).toBe("192.168.1.254");
  });

  it("calculates 10.0.0.0/8 correctly", () => {
    const result = calculateSubnet("10.0.0.0", 8);
    expect(result.networkAddress).toBe("10.0.0.0");
    expect(result.broadcastAddress).toBe("10.255.255.255");
    expect(result.subnetMask).toBe("255.0.0.0");
  });

  it("calculates /30 for point-to-point", () => {
    const result = calculateSubnet("172.16.0.0", 30);
    expect(result.usableHosts).toBe(2);
    expect(result.totalHosts).toBe(4);
  });
});
