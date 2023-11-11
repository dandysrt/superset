interface SuperSet<T> {
    /**
     * @summary Union operation between an Iterable and current SuperSet object.
     *          Values are uniquified in the resultant SuperSet
     * @param   {Iterable} candidate - iterable value to perform union with current SuperSet
     * @return  {SuperSet} - result of union operation
     */
    union(candidate: Iterable<any>): SuperSet<T>;

    /**
     * @summary Relative complement (or set difference)  operation between 
     *          Iterable and current SuperSet object.
     *          Values are uniquified in the resultant SuperSet
     * @param   {Iterable} candidate - iterable value to perform complement/asymmetric
     *          difference with current SuperSet
     * @return  {SuperSet} - result of complement operation
     */
    complement(candidate: Iterable<any>): SuperSet<T>;

    /**
     * @summary Symmetric difference operation between Iterable  and current SuperSet object.
     *          Values are uniquified in the resultant SuperSet
     * @param   {Iterable} candidate - iterable value to perform symmetric difference with current SuperSet
     * @return  {SuperSet} - result of difference operation
     */
    difference(candidate: Iterable<any>): SuperSet<T>;

    /**
     * @summary Intersection operation between iterable and current SuperSet object.
     *          Values are uniquified in the resultant SuperSet
     * @param   {Iterable} candidate - iterable value to intersect with current SuperSet
     * @return  {SuperSet} - result of intersection operation
     */
    intersection(candidate: Iterable<any>): SuperSet<T>;

    /**
     * @summary Cartesian product between Iterable and current SuperSet object.
     *          Iterable values are uniquified.
     * @param   {Iterable} candidate - second-place iterable value in cartesian set equation
     * @return  {SuperSet} - SuperSet containing cartesian product
     */
    cartesian(candidate: Iterable<any>): SuperSet<T>;

    /**
     * @summary Determines if the current SuperSet values are contained within the provided Iterable.
     *          Iterable values are uniquified.
     * @param   {Iterable} candidate - Iterable value to test
     * @return  {boolean} - returns true if current SuperSet is a
     *          subset of the provided value
     */
    subsetOf(candidate:  Iterable<any>): boolean;

    /**
     * @summary Determine if current SuperSet contains all of the values
     *          contained in the provided Iterable.
     *          Iterable values are uniquified.
     * @param   {Iterable} candidate - Iterable value to test
     * @return  {boolean} - returns true if candidate is a subset of current SuperSet
     */
    supersetOf(candidate: Iterable<any>): boolean;

    /**
     * @summary outputs current SuperSet as an Array
     * @return  {Array} - Array of SuperSet values
     */
    toArray(): Array<T>;
}
