export class SuperSet<T=any> extends Set<T> {

    /**
     * @summary Determines if a value is Iterable instance
     * @param {any} candidate - value to test
     * @return {void}
     */
    private isIterable = function(candidate: any): void {
        if (typeof candidate[Symbol.iterator] === "function") return;
        throw new TypeError("Argument must be of type 'Iterable'");
    }

    /**
     * @summary Union operation between an Iterable and current SuperSet object.
     *          Values are uniquified in the resultant SuperSet
     * @param   {Iterable} candidate - iterable value to perform union with current SuperSet
     * @return  {SuperSet} - result of union operation
     */
    public union = function (candidate: Iterable<T>): SuperSet<T> {
        this.isIterable(candidate);
        return new SuperSet<T>(
            Array.from(this).concat(Array.from(candidate)) as T[]
        );
    }

    /**
     * @summary Relative complement (or asymmetric difference)  operation between 
     *          Iterable and current SuperSet object.
     *          Values are uniquified in the resultant SuperSet
     * @param   {Iterable} candidate - iterable value to perform complement/asymmetric
     *          difference with current SuperSet
     * @return  {SuperSet} - result of complement operation
     */
    public complement = function (candidate: Iterable<T>): SuperSet<T> {
        this.isIterable(candidate);
        const candidateSet = new SuperSet(candidate);
        const resultSet = new SuperSet();
        this.forEach((x: T) => {
            if(!candidateSet.has(x)) {
                resultSet.add(x);
            }
        });

        return resultSet;
    }

    /**
     * @summary Symmetric difference operation between Iterable  and current SuperSet object.
     *          Values are uniquified in the resultant SuperSet
     * @param   {Iterable} candidate - iterable value to perform symmetric difference with current SuperSet
     * @return  {SuperSet} - result of difference operation
     */
    public difference = function (candidate: Iterable<T>): SuperSet<T> {
        this.isIterable(candidate);
        const candidateSet = new SuperSet(candidate);

        const sourceComplement = this.complement(candidateSet);
        const candidateComplement = candidateSet.complement(this);

        return sourceComplement.union(candidateComplement);
    }

    /**
     * @summary Intersection operation between iterable and current SuperSet object.
     *          Values are uniquified in the resultant SuperSet
     * @param   {Iterable} candidate - iterable value to intersect with current SuperSet
     * @return  {SuperSet} - result of intersection operation
     */
    public intersection = function (candidate: Iterable<T>): SuperSet<T> {
        this.isIterable(candidate);
        let smallest = new SuperSet<T>(candidate);
        let largest = this as SuperSet<T>;
        const resultSet = new SuperSet<T>();

        if (smallest.size > largest.size) {
            const temp = smallest;
            smallest = largest;
            largest = temp;
        }


        smallest.forEach((x: T) => {
            if (largest.has(x)) {
                resultSet.add(x);
            }
        });

        return resultSet;
    }

    /**
     * @summary Cartesian product between Iterable and current SuperSet object.
     *          Iterable values are uniquified.
     * @param   {Iterable} candidate - second-place iterable value in cartesian set equation
     * @return  {SuperSet} - SuperSet containing cartesian product
     */
    public cartesian = function (candidate: Iterable<T>): SuperSet<[T,T]> {
        this.isIterable(candidate);
        const candidateSet = new SuperSet<T>(candidate);
        const resultSet = new SuperSet<[T,T]>();
        this.forEach((x: T) => {
            candidateSet.forEach((y: T) => {
                resultSet.add([x, y]);
            });
        });

        return resultSet;
    }

    /**
     * @summary Determines if the current SuperSet values are contained within the provided Iterable.
     *          Iterable values are uniquified.
     * @param   {Iterable} candidate - Iterable value to test
     * @return  {boolean} - returns true if current SuperSet is a
     *          subset of the provided value
     */
    public subsetOf = function (candidate: Iterable<T>): boolean {
        this.isIterable(candidate);
        const candidateSet = new SuperSet<T>(candidate);
        const temp = this.union(candidate);
        return temp.size === candidateSet.size;
    }

    /**
     * @summary Determine if current SuperSet contains all of the values
     *          contained in the provided Iterable.
     *          Iterable values are uniquified.
     * @param   {Iterable} candidate - Iterable value to test
     * @return  {boolean} - returns true if candidate is a subset of current SuperSet
     */
    public supersetOf = function (candidate: Iterable<T>): boolean {
        this.isIterable(candidate);
        const candidateSet = new SuperSet<T>(candidate);
        return candidateSet.subsetOf(this);
    }

    /**
     * @summary outputs current SuperSet as an Array
     * @return  {Array} - Array of SuperSet values
     */
    public toArray = function (): Array<T> {
        return Array.from(this);
    }
}

export default SuperSet;