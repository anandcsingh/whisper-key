export class AddressExtensions {
    static getShortAddress(address: string): string {
        return address.substring(0, 5) + "..." + address.substring(address.length - 5, address.length);
    }
}