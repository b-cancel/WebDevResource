<?php

namespace Base;

use \Enemy as ChildEnemy;
use \EnemyQuery as ChildEnemyQuery;
use \Exception;
use \PDO;
use Map\EnemyTableMap;
use Propel\Runtime\Propel;
use Propel\Runtime\ActiveQuery\Criteria;
use Propel\Runtime\ActiveQuery\ModelCriteria;
use Propel\Runtime\Collection\ObjectCollection;
use Propel\Runtime\Connection\ConnectionInterface;
use Propel\Runtime\Exception\PropelException;

/**
 * Base class that represents a query for the 'enemy' table.
 *
 *
 *
 * @method     ChildEnemyQuery orderById($order = Criteria::ASC) Order by the id column
 * @method     ChildEnemyQuery orderByPriority($order = Criteria::ASC) Order by the priority column
 * @method     ChildEnemyQuery orderByUsername($order = Criteria::ASC) Order by the username column
 * @method     ChildEnemyQuery orderByJustification($order = Criteria::ASC) Order by the justification column
 *
 * @method     ChildEnemyQuery groupById() Group by the id column
 * @method     ChildEnemyQuery groupByPriority() Group by the priority column
 * @method     ChildEnemyQuery groupByUsername() Group by the username column
 * @method     ChildEnemyQuery groupByJustification() Group by the justification column
 *
 * @method     ChildEnemyQuery leftJoin($relation) Adds a LEFT JOIN clause to the query
 * @method     ChildEnemyQuery rightJoin($relation) Adds a RIGHT JOIN clause to the query
 * @method     ChildEnemyQuery innerJoin($relation) Adds a INNER JOIN clause to the query
 *
 * @method     ChildEnemyQuery leftJoinWith($relation) Adds a LEFT JOIN clause and with to the query
 * @method     ChildEnemyQuery rightJoinWith($relation) Adds a RIGHT JOIN clause and with to the query
 * @method     ChildEnemyQuery innerJoinWith($relation) Adds a INNER JOIN clause and with to the query
 *
 * @method     ChildEnemy findOne(ConnectionInterface $con = null) Return the first ChildEnemy matching the query
 * @method     ChildEnemy findOneOrCreate(ConnectionInterface $con = null) Return the first ChildEnemy matching the query, or a new ChildEnemy object populated from the query conditions when no match is found
 *
 * @method     ChildEnemy findOneById(int $id) Return the first ChildEnemy filtered by the id column
 * @method     ChildEnemy findOneByPriority(int $priority) Return the first ChildEnemy filtered by the priority column
 * @method     ChildEnemy findOneByUsername(string $username) Return the first ChildEnemy filtered by the username column
 * @method     ChildEnemy findOneByJustification(string $justification) Return the first ChildEnemy filtered by the justification column *

 * @method     ChildEnemy requirePk($key, ConnectionInterface $con = null) Return the ChildEnemy by primary key and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildEnemy requireOne(ConnectionInterface $con = null) Return the first ChildEnemy matching the query and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 *
 * @method     ChildEnemy requireOneById(int $id) Return the first ChildEnemy filtered by the id column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildEnemy requireOneByPriority(int $priority) Return the first ChildEnemy filtered by the priority column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildEnemy requireOneByUsername(string $username) Return the first ChildEnemy filtered by the username column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildEnemy requireOneByJustification(string $justification) Return the first ChildEnemy filtered by the justification column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 *
 * @method     ChildEnemy[]|ObjectCollection find(ConnectionInterface $con = null) Return ChildEnemy objects based on current ModelCriteria
 * @method     ChildEnemy[]|ObjectCollection findById(int $id) Return ChildEnemy objects filtered by the id column
 * @method     ChildEnemy[]|ObjectCollection findByPriority(int $priority) Return ChildEnemy objects filtered by the priority column
 * @method     ChildEnemy[]|ObjectCollection findByUsername(string $username) Return ChildEnemy objects filtered by the username column
 * @method     ChildEnemy[]|ObjectCollection findByJustification(string $justification) Return ChildEnemy objects filtered by the justification column
 * @method     ChildEnemy[]|\Propel\Runtime\Util\PropelModelPager paginate($page = 1, $maxPerPage = 10, ConnectionInterface $con = null) Issue a SELECT query based on the current ModelCriteria and uses a page and a maximum number of results per page to compute an offset and a limit
 *
 */
abstract class EnemyQuery extends ModelCriteria
{
    protected $entityNotFoundExceptionClass = '\\Propel\\Runtime\\Exception\\EntityNotFoundException';

    /**
     * Initializes internal state of \Base\EnemyQuery object.
     *
     * @param     string $dbName The database name
     * @param     string $modelName The phpName of a model, e.g. 'Book'
     * @param     string $modelAlias The alias for the model in this query, e.g. 'b'
     */
    public function __construct($dbName = 'default', $modelName = '\\Enemy', $modelAlias = null)
    {
        parent::__construct($dbName, $modelName, $modelAlias);
    }

    /**
     * Returns a new ChildEnemyQuery object.
     *
     * @param     string $modelAlias The alias of a model in the query
     * @param     Criteria $criteria Optional Criteria to build the query from
     *
     * @return ChildEnemyQuery
     */
    public static function create($modelAlias = null, Criteria $criteria = null)
    {
        if ($criteria instanceof ChildEnemyQuery) {
            return $criteria;
        }
        $query = new ChildEnemyQuery();
        if (null !== $modelAlias) {
            $query->setModelAlias($modelAlias);
        }
        if ($criteria instanceof Criteria) {
            $query->mergeWith($criteria);
        }

        return $query;
    }

    /**
     * Find object by primary key.
     * Propel uses the instance pool to skip the database if the object exists.
     * Go fast if the query is untouched.
     *
     * <code>
     * $obj  = $c->findPk(12, $con);
     * </code>
     *
     * @param mixed $key Primary key to use for the query
     * @param ConnectionInterface $con an optional connection object
     *
     * @return ChildEnemy|array|mixed the result, formatted by the current formatter
     */
    public function findPk($key, ConnectionInterface $con = null)
    {
        if ($key === null) {
            return null;
        }

        if ($con === null) {
            $con = Propel::getServiceContainer()->getReadConnection(EnemyTableMap::DATABASE_NAME);
        }

        $this->basePreSelect($con);

        if (
            $this->formatter || $this->modelAlias || $this->with || $this->select
            || $this->selectColumns || $this->asColumns || $this->selectModifiers
            || $this->map || $this->having || $this->joins
        ) {
            return $this->findPkComplex($key, $con);
        }

        if ((null !== ($obj = EnemyTableMap::getInstanceFromPool(null === $key || is_scalar($key) || is_callable([$key, '__toString']) ? (string) $key : $key)))) {
            // the object is already in the instance pool
            return $obj;
        }

        return $this->findPkSimple($key, $con);
    }

    /**
     * Find object by primary key using raw SQL to go fast.
     * Bypass doSelect() and the object formatter by using generated code.
     *
     * @param     mixed $key Primary key to use for the query
     * @param     ConnectionInterface $con A connection object
     *
     * @throws \Propel\Runtime\Exception\PropelException
     *
     * @return ChildEnemy A model object, or null if the key is not found
     */
    protected function findPkSimple($key, ConnectionInterface $con)
    {
        $sql = 'SELECT id, priority, username, justification FROM enemy WHERE id = :p0';
        try {
            $stmt = $con->prepare($sql);
            $stmt->bindValue(':p0', $key, PDO::PARAM_INT);
            $stmt->execute();
        } catch (Exception $e) {
            Propel::log($e->getMessage(), Propel::LOG_ERR);
            throw new PropelException(sprintf('Unable to execute SELECT statement [%s]', $sql), 0, $e);
        }
        $obj = null;
        if ($row = $stmt->fetch(\PDO::FETCH_NUM)) {
            /** @var ChildEnemy $obj */
            $obj = new ChildEnemy();
            $obj->hydrate($row);
            EnemyTableMap::addInstanceToPool($obj, null === $key || is_scalar($key) || is_callable([$key, '__toString']) ? (string) $key : $key);
        }
        $stmt->closeCursor();

        return $obj;
    }

    /**
     * Find object by primary key.
     *
     * @param     mixed $key Primary key to use for the query
     * @param     ConnectionInterface $con A connection object
     *
     * @return ChildEnemy|array|mixed the result, formatted by the current formatter
     */
    protected function findPkComplex($key, ConnectionInterface $con)
    {
        // As the query uses a PK condition, no limit(1) is necessary.
        $criteria = $this->isKeepQuery() ? clone $this : $this;
        $dataFetcher = $criteria
            ->filterByPrimaryKey($key)
            ->doSelect($con);

        return $criteria->getFormatter()->init($criteria)->formatOne($dataFetcher);
    }

    /**
     * Find objects by primary key
     * <code>
     * $objs = $c->findPks(array(12, 56, 832), $con);
     * </code>
     * @param     array $keys Primary keys to use for the query
     * @param     ConnectionInterface $con an optional connection object
     *
     * @return ObjectCollection|array|mixed the list of results, formatted by the current formatter
     */
    public function findPks($keys, ConnectionInterface $con = null)
    {
        if (null === $con) {
            $con = Propel::getServiceContainer()->getReadConnection($this->getDbName());
        }
        $this->basePreSelect($con);
        $criteria = $this->isKeepQuery() ? clone $this : $this;
        $dataFetcher = $criteria
            ->filterByPrimaryKeys($keys)
            ->doSelect($con);

        return $criteria->getFormatter()->init($criteria)->format($dataFetcher);
    }

    /**
     * Filter the query by primary key
     *
     * @param     mixed $key Primary key to use for the query
     *
     * @return $this|ChildEnemyQuery The current query, for fluid interface
     */
    public function filterByPrimaryKey($key)
    {

        return $this->addUsingAlias(EnemyTableMap::COL_ID, $key, Criteria::EQUAL);
    }

    /**
     * Filter the query by a list of primary keys
     *
     * @param     array $keys The list of primary key to use for the query
     *
     * @return $this|ChildEnemyQuery The current query, for fluid interface
     */
    public function filterByPrimaryKeys($keys)
    {

        return $this->addUsingAlias(EnemyTableMap::COL_ID, $keys, Criteria::IN);
    }

    /**
     * Filter the query on the id column
     *
     * Example usage:
     * <code>
     * $query->filterById(1234); // WHERE id = 1234
     * $query->filterById(array(12, 34)); // WHERE id IN (12, 34)
     * $query->filterById(array('min' => 12)); // WHERE id > 12
     * </code>
     *
     * @param     mixed $id The value to use as filter.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildEnemyQuery The current query, for fluid interface
     */
    public function filterById($id = null, $comparison = null)
    {
        if (is_array($id)) {
            $useMinMax = false;
            if (isset($id['min'])) {
                $this->addUsingAlias(EnemyTableMap::COL_ID, $id['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($id['max'])) {
                $this->addUsingAlias(EnemyTableMap::COL_ID, $id['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(EnemyTableMap::COL_ID, $id, $comparison);
    }

    /**
     * Filter the query on the priority column
     *
     * Example usage:
     * <code>
     * $query->filterByPriority(1234); // WHERE priority = 1234
     * $query->filterByPriority(array(12, 34)); // WHERE priority IN (12, 34)
     * $query->filterByPriority(array('min' => 12)); // WHERE priority > 12
     * </code>
     *
     * @param     mixed $priority The value to use as filter.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildEnemyQuery The current query, for fluid interface
     */
    public function filterByPriority($priority = null, $comparison = null)
    {
        if (is_array($priority)) {
            $useMinMax = false;
            if (isset($priority['min'])) {
                $this->addUsingAlias(EnemyTableMap::COL_PRIORITY, $priority['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($priority['max'])) {
                $this->addUsingAlias(EnemyTableMap::COL_PRIORITY, $priority['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(EnemyTableMap::COL_PRIORITY, $priority, $comparison);
    }

    /**
     * Filter the query on the username column
     *
     * Example usage:
     * <code>
     * $query->filterByUsername('fooValue');   // WHERE username = 'fooValue'
     * $query->filterByUsername('%fooValue%', Criteria::LIKE); // WHERE username LIKE '%fooValue%'
     * </code>
     *
     * @param     string $username The value to use as filter.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildEnemyQuery The current query, for fluid interface
     */
    public function filterByUsername($username = null, $comparison = null)
    {
        if (null === $comparison) {
            if (is_array($username)) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(EnemyTableMap::COL_USERNAME, $username, $comparison);
    }

    /**
     * Filter the query on the justification column
     *
     * Example usage:
     * <code>
     * $query->filterByJustification('fooValue');   // WHERE justification = 'fooValue'
     * $query->filterByJustification('%fooValue%', Criteria::LIKE); // WHERE justification LIKE '%fooValue%'
     * </code>
     *
     * @param     string $justification The value to use as filter.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildEnemyQuery The current query, for fluid interface
     */
    public function filterByJustification($justification = null, $comparison = null)
    {
        if (null === $comparison) {
            if (is_array($justification)) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(EnemyTableMap::COL_JUSTIFICATION, $justification, $comparison);
    }

    /**
     * Exclude object from result
     *
     * @param   ChildEnemy $enemy Object to remove from the list of results
     *
     * @return $this|ChildEnemyQuery The current query, for fluid interface
     */
    public function prune($enemy = null)
    {
        if ($enemy) {
            $this->addUsingAlias(EnemyTableMap::COL_ID, $enemy->getId(), Criteria::NOT_EQUAL);
        }

        return $this;
    }

    /**
     * Deletes all rows from the enemy table.
     *
     * @param ConnectionInterface $con the connection to use
     * @return int The number of affected rows (if supported by underlying database driver).
     */
    public function doDeleteAll(ConnectionInterface $con = null)
    {
        if (null === $con) {
            $con = Propel::getServiceContainer()->getWriteConnection(EnemyTableMap::DATABASE_NAME);
        }

        // use transaction because $criteria could contain info
        // for more than one table or we could emulating ON DELETE CASCADE, etc.
        return $con->transaction(function () use ($con) {
            $affectedRows = 0; // initialize var to track total num of affected rows
            $affectedRows += parent::doDeleteAll($con);
            // Because this db requires some delete cascade/set null emulation, we have to
            // clear the cached instance *after* the emulation has happened (since
            // instances get re-added by the select statement contained therein).
            EnemyTableMap::clearInstancePool();
            EnemyTableMap::clearRelatedInstancePool();

            return $affectedRows;
        });
    }

    /**
     * Performs a DELETE on the database based on the current ModelCriteria
     *
     * @param ConnectionInterface $con the connection to use
     * @return int             The number of affected rows (if supported by underlying database driver).  This includes CASCADE-related rows
     *                         if supported by native driver or if emulated using Propel.
     * @throws PropelException Any exceptions caught during processing will be
     *                         rethrown wrapped into a PropelException.
     */
    public function delete(ConnectionInterface $con = null)
    {
        if (null === $con) {
            $con = Propel::getServiceContainer()->getWriteConnection(EnemyTableMap::DATABASE_NAME);
        }

        $criteria = $this;

        // Set the correct dbName
        $criteria->setDbName(EnemyTableMap::DATABASE_NAME);

        // use transaction because $criteria could contain info
        // for more than one table or we could emulating ON DELETE CASCADE, etc.
        return $con->transaction(function () use ($con, $criteria) {
            $affectedRows = 0; // initialize var to track total num of affected rows

            EnemyTableMap::removeInstanceFromPool($criteria);

            $affectedRows += ModelCriteria::delete($con);
            EnemyTableMap::clearRelatedInstancePool();

            return $affectedRows;
        });
    }

} // EnemyQuery
