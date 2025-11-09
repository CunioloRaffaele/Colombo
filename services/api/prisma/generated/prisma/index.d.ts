
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model area
 * 
 */
export type area = $Result.DefaultSelection<Prisma.$areaPayload>
/**
 * Model cittadini
 * 
 */
export type cittadini = $Result.DefaultSelection<Prisma.$cittadiniPayload>
/**
 * Model comuni
 * 
 */
export type comuni = $Result.DefaultSelection<Prisma.$comuniPayload>
/**
 * Model ecoscores
 * 
 */
export type ecoscores = $Result.DefaultSelection<Prisma.$ecoscoresPayload>
/**
 * Model propriet_
 * 
 */
export type propriet_ = $Result.DefaultSelection<Prisma.$propriet_Payload>
/**
 * Model sessioni
 * 
 */
export type sessioni = $Result.DefaultSelection<Prisma.$sessioniPayload>
/**
 * Model spatial_ref_sys
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type spatial_ref_sys = $Result.DefaultSelection<Prisma.$spatial_ref_sysPayload>
/**
 * Model vetture
 * 
 */
export type vetture = $Result.DefaultSelection<Prisma.$vetturePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Areas
 * const areas = await prisma.area.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Areas
   * const areas = await prisma.area.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.area`: Exposes CRUD operations for the **area** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Areas
    * const areas = await prisma.area.findMany()
    * ```
    */
  get area(): Prisma.areaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cittadini`: Exposes CRUD operations for the **cittadini** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cittadinis
    * const cittadinis = await prisma.cittadini.findMany()
    * ```
    */
  get cittadini(): Prisma.cittadiniDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comuni`: Exposes CRUD operations for the **comuni** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comunis
    * const comunis = await prisma.comuni.findMany()
    * ```
    */
  get comuni(): Prisma.comuniDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ecoscores`: Exposes CRUD operations for the **ecoscores** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ecoscores
    * const ecoscores = await prisma.ecoscores.findMany()
    * ```
    */
  get ecoscores(): Prisma.ecoscoresDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.propriet_`: Exposes CRUD operations for the **propriet_** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Propriet_s
    * const propriet_s = await prisma.propriet_.findMany()
    * ```
    */
  get propriet_(): Prisma.propriet_Delegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sessioni`: Exposes CRUD operations for the **sessioni** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessionis
    * const sessionis = await prisma.sessioni.findMany()
    * ```
    */
  get sessioni(): Prisma.sessioniDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.spatial_ref_sys`: Exposes CRUD operations for the **spatial_ref_sys** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Spatial_ref_sys
    * const spatial_ref_sys = await prisma.spatial_ref_sys.findMany()
    * ```
    */
  get spatial_ref_sys(): Prisma.spatial_ref_sysDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vetture`: Exposes CRUD operations for the **vetture** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vettures
    * const vettures = await prisma.vetture.findMany()
    * ```
    */
  get vetture(): Prisma.vettureDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.0
   * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    area: 'area',
    cittadini: 'cittadini',
    comuni: 'comuni',
    ecoscores: 'ecoscores',
    propriet_: 'propriet_',
    sessioni: 'sessioni',
    spatial_ref_sys: 'spatial_ref_sys',
    vetture: 'vetture'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "area" | "cittadini" | "comuni" | "ecoscores" | "propriet_" | "sessioni" | "spatial_ref_sys" | "vetture"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      area: {
        payload: Prisma.$areaPayload<ExtArgs>
        fields: Prisma.areaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.areaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$areaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.areaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$areaPayload>
          }
          findFirst: {
            args: Prisma.areaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$areaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.areaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$areaPayload>
          }
          findMany: {
            args: Prisma.areaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$areaPayload>[]
          }
          create: {
            args: Prisma.areaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$areaPayload>
          }
          createMany: {
            args: Prisma.areaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.areaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$areaPayload>[]
          }
          delete: {
            args: Prisma.areaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$areaPayload>
          }
          update: {
            args: Prisma.areaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$areaPayload>
          }
          deleteMany: {
            args: Prisma.areaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.areaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.areaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$areaPayload>[]
          }
          upsert: {
            args: Prisma.areaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$areaPayload>
          }
          aggregate: {
            args: Prisma.AreaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArea>
          }
          groupBy: {
            args: Prisma.areaGroupByArgs<ExtArgs>
            result: $Utils.Optional<AreaGroupByOutputType>[]
          }
          count: {
            args: Prisma.areaCountArgs<ExtArgs>
            result: $Utils.Optional<AreaCountAggregateOutputType> | number
          }
        }
      }
      cittadini: {
        payload: Prisma.$cittadiniPayload<ExtArgs>
        fields: Prisma.cittadiniFieldRefs
        operations: {
          findUnique: {
            args: Prisma.cittadiniFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cittadiniPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.cittadiniFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cittadiniPayload>
          }
          findFirst: {
            args: Prisma.cittadiniFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cittadiniPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.cittadiniFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cittadiniPayload>
          }
          findMany: {
            args: Prisma.cittadiniFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cittadiniPayload>[]
          }
          create: {
            args: Prisma.cittadiniCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cittadiniPayload>
          }
          createMany: {
            args: Prisma.cittadiniCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.cittadiniCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cittadiniPayload>[]
          }
          delete: {
            args: Prisma.cittadiniDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cittadiniPayload>
          }
          update: {
            args: Prisma.cittadiniUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cittadiniPayload>
          }
          deleteMany: {
            args: Prisma.cittadiniDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.cittadiniUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.cittadiniUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cittadiniPayload>[]
          }
          upsert: {
            args: Prisma.cittadiniUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cittadiniPayload>
          }
          aggregate: {
            args: Prisma.CittadiniAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCittadini>
          }
          groupBy: {
            args: Prisma.cittadiniGroupByArgs<ExtArgs>
            result: $Utils.Optional<CittadiniGroupByOutputType>[]
          }
          count: {
            args: Prisma.cittadiniCountArgs<ExtArgs>
            result: $Utils.Optional<CittadiniCountAggregateOutputType> | number
          }
        }
      }
      comuni: {
        payload: Prisma.$comuniPayload<ExtArgs>
        fields: Prisma.comuniFieldRefs
        operations: {
          findUnique: {
            args: Prisma.comuniFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$comuniPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.comuniFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$comuniPayload>
          }
          findFirst: {
            args: Prisma.comuniFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$comuniPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.comuniFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$comuniPayload>
          }
          findMany: {
            args: Prisma.comuniFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$comuniPayload>[]
          }
          create: {
            args: Prisma.comuniCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$comuniPayload>
          }
          createMany: {
            args: Prisma.comuniCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.comuniCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$comuniPayload>[]
          }
          delete: {
            args: Prisma.comuniDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$comuniPayload>
          }
          update: {
            args: Prisma.comuniUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$comuniPayload>
          }
          deleteMany: {
            args: Prisma.comuniDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.comuniUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.comuniUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$comuniPayload>[]
          }
          upsert: {
            args: Prisma.comuniUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$comuniPayload>
          }
          aggregate: {
            args: Prisma.ComuniAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComuni>
          }
          groupBy: {
            args: Prisma.comuniGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComuniGroupByOutputType>[]
          }
          count: {
            args: Prisma.comuniCountArgs<ExtArgs>
            result: $Utils.Optional<ComuniCountAggregateOutputType> | number
          }
        }
      }
      ecoscores: {
        payload: Prisma.$ecoscoresPayload<ExtArgs>
        fields: Prisma.ecoscoresFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ecoscoresFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ecoscoresPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ecoscoresFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ecoscoresPayload>
          }
          findFirst: {
            args: Prisma.ecoscoresFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ecoscoresPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ecoscoresFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ecoscoresPayload>
          }
          findMany: {
            args: Prisma.ecoscoresFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ecoscoresPayload>[]
          }
          create: {
            args: Prisma.ecoscoresCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ecoscoresPayload>
          }
          createMany: {
            args: Prisma.ecoscoresCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ecoscoresCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ecoscoresPayload>[]
          }
          delete: {
            args: Prisma.ecoscoresDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ecoscoresPayload>
          }
          update: {
            args: Prisma.ecoscoresUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ecoscoresPayload>
          }
          deleteMany: {
            args: Prisma.ecoscoresDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ecoscoresUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ecoscoresUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ecoscoresPayload>[]
          }
          upsert: {
            args: Prisma.ecoscoresUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ecoscoresPayload>
          }
          aggregate: {
            args: Prisma.EcoscoresAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEcoscores>
          }
          groupBy: {
            args: Prisma.ecoscoresGroupByArgs<ExtArgs>
            result: $Utils.Optional<EcoscoresGroupByOutputType>[]
          }
          count: {
            args: Prisma.ecoscoresCountArgs<ExtArgs>
            result: $Utils.Optional<EcoscoresCountAggregateOutputType> | number
          }
        }
      }
      propriet_: {
        payload: Prisma.$propriet_Payload<ExtArgs>
        fields: Prisma.propriet_FieldRefs
        operations: {
          findUnique: {
            args: Prisma.propriet_FindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propriet_Payload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.propriet_FindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propriet_Payload>
          }
          findFirst: {
            args: Prisma.propriet_FindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propriet_Payload> | null
          }
          findFirstOrThrow: {
            args: Prisma.propriet_FindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propriet_Payload>
          }
          findMany: {
            args: Prisma.propriet_FindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propriet_Payload>[]
          }
          create: {
            args: Prisma.propriet_CreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propriet_Payload>
          }
          createMany: {
            args: Prisma.propriet_CreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.propriet_CreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propriet_Payload>[]
          }
          delete: {
            args: Prisma.propriet_DeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propriet_Payload>
          }
          update: {
            args: Prisma.propriet_UpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propriet_Payload>
          }
          deleteMany: {
            args: Prisma.propriet_DeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.propriet_UpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.propriet_UpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propriet_Payload>[]
          }
          upsert: {
            args: Prisma.propriet_UpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propriet_Payload>
          }
          aggregate: {
            args: Prisma.Propriet_AggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePropriet_>
          }
          groupBy: {
            args: Prisma.propriet_GroupByArgs<ExtArgs>
            result: $Utils.Optional<Propriet_GroupByOutputType>[]
          }
          count: {
            args: Prisma.propriet_CountArgs<ExtArgs>
            result: $Utils.Optional<Propriet_CountAggregateOutputType> | number
          }
        }
      }
      sessioni: {
        payload: Prisma.$sessioniPayload<ExtArgs>
        fields: Prisma.sessioniFieldRefs
        operations: {
          findUnique: {
            args: Prisma.sessioniFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessioniPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.sessioniFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessioniPayload>
          }
          findFirst: {
            args: Prisma.sessioniFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessioniPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.sessioniFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessioniPayload>
          }
          findMany: {
            args: Prisma.sessioniFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessioniPayload>[]
          }
          create: {
            args: Prisma.sessioniCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessioniPayload>
          }
          createMany: {
            args: Prisma.sessioniCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.sessioniCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessioniPayload>[]
          }
          delete: {
            args: Prisma.sessioniDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessioniPayload>
          }
          update: {
            args: Prisma.sessioniUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessioniPayload>
          }
          deleteMany: {
            args: Prisma.sessioniDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.sessioniUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.sessioniUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessioniPayload>[]
          }
          upsert: {
            args: Prisma.sessioniUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessioniPayload>
          }
          aggregate: {
            args: Prisma.SessioniAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSessioni>
          }
          groupBy: {
            args: Prisma.sessioniGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessioniGroupByOutputType>[]
          }
          count: {
            args: Prisma.sessioniCountArgs<ExtArgs>
            result: $Utils.Optional<SessioniCountAggregateOutputType> | number
          }
        }
      }
      spatial_ref_sys: {
        payload: Prisma.$spatial_ref_sysPayload<ExtArgs>
        fields: Prisma.spatial_ref_sysFieldRefs
        operations: {
          findUnique: {
            args: Prisma.spatial_ref_sysFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spatial_ref_sysPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.spatial_ref_sysFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spatial_ref_sysPayload>
          }
          findFirst: {
            args: Prisma.spatial_ref_sysFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spatial_ref_sysPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.spatial_ref_sysFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spatial_ref_sysPayload>
          }
          findMany: {
            args: Prisma.spatial_ref_sysFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spatial_ref_sysPayload>[]
          }
          create: {
            args: Prisma.spatial_ref_sysCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spatial_ref_sysPayload>
          }
          createMany: {
            args: Prisma.spatial_ref_sysCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.spatial_ref_sysCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spatial_ref_sysPayload>[]
          }
          delete: {
            args: Prisma.spatial_ref_sysDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spatial_ref_sysPayload>
          }
          update: {
            args: Prisma.spatial_ref_sysUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spatial_ref_sysPayload>
          }
          deleteMany: {
            args: Prisma.spatial_ref_sysDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.spatial_ref_sysUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.spatial_ref_sysUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spatial_ref_sysPayload>[]
          }
          upsert: {
            args: Prisma.spatial_ref_sysUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spatial_ref_sysPayload>
          }
          aggregate: {
            args: Prisma.Spatial_ref_sysAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpatial_ref_sys>
          }
          groupBy: {
            args: Prisma.spatial_ref_sysGroupByArgs<ExtArgs>
            result: $Utils.Optional<Spatial_ref_sysGroupByOutputType>[]
          }
          count: {
            args: Prisma.spatial_ref_sysCountArgs<ExtArgs>
            result: $Utils.Optional<Spatial_ref_sysCountAggregateOutputType> | number
          }
        }
      }
      vetture: {
        payload: Prisma.$vetturePayload<ExtArgs>
        fields: Prisma.vettureFieldRefs
        operations: {
          findUnique: {
            args: Prisma.vettureFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$vetturePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.vettureFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$vetturePayload>
          }
          findFirst: {
            args: Prisma.vettureFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$vetturePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.vettureFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$vetturePayload>
          }
          findMany: {
            args: Prisma.vettureFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$vetturePayload>[]
          }
          create: {
            args: Prisma.vettureCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$vetturePayload>
          }
          createMany: {
            args: Prisma.vettureCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.vettureCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$vetturePayload>[]
          }
          delete: {
            args: Prisma.vettureDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$vetturePayload>
          }
          update: {
            args: Prisma.vettureUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$vetturePayload>
          }
          deleteMany: {
            args: Prisma.vettureDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.vettureUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.vettureUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$vetturePayload>[]
          }
          upsert: {
            args: Prisma.vettureUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$vetturePayload>
          }
          aggregate: {
            args: Prisma.VettureAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVetture>
          }
          groupBy: {
            args: Prisma.vettureGroupByArgs<ExtArgs>
            result: $Utils.Optional<VettureGroupByOutputType>[]
          }
          count: {
            args: Prisma.vettureCountArgs<ExtArgs>
            result: $Utils.Optional<VettureCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    area?: areaOmit
    cittadini?: cittadiniOmit
    comuni?: comuniOmit
    ecoscores?: ecoscoresOmit
    propriet_?: propriet_Omit
    sessioni?: sessioniOmit
    spatial_ref_sys?: spatial_ref_sysOmit
    vetture?: vettureOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AreaCountOutputType
   */

  export type AreaCountOutputType = {
    ecoscores: number
  }

  export type AreaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ecoscores?: boolean | AreaCountOutputTypeCountEcoscoresArgs
  }

  // Custom InputTypes
  /**
   * AreaCountOutputType without action
   */
  export type AreaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AreaCountOutputType
     */
    select?: AreaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AreaCountOutputType without action
   */
  export type AreaCountOutputTypeCountEcoscoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ecoscoresWhereInput
  }


  /**
   * Count Type CittadiniCountOutputType
   */

  export type CittadiniCountOutputType = {
    propriet_: number
    sessioni: number
  }

  export type CittadiniCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    propriet_?: boolean | CittadiniCountOutputTypeCountPropriet_Args
    sessioni?: boolean | CittadiniCountOutputTypeCountSessioniArgs
  }

  // Custom InputTypes
  /**
   * CittadiniCountOutputType without action
   */
  export type CittadiniCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CittadiniCountOutputType
     */
    select?: CittadiniCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CittadiniCountOutputType without action
   */
  export type CittadiniCountOutputTypeCountPropriet_Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: propriet_WhereInput
  }

  /**
   * CittadiniCountOutputType without action
   */
  export type CittadiniCountOutputTypeCountSessioniArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sessioniWhereInput
  }


  /**
   * Count Type ComuniCountOutputType
   */

  export type ComuniCountOutputType = {
    area: number
  }

  export type ComuniCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    area?: boolean | ComuniCountOutputTypeCountAreaArgs
  }

  // Custom InputTypes
  /**
   * ComuniCountOutputType without action
   */
  export type ComuniCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComuniCountOutputType
     */
    select?: ComuniCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ComuniCountOutputType without action
   */
  export type ComuniCountOutputTypeCountAreaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: areaWhereInput
  }


  /**
   * Count Type SessioniCountOutputType
   */

  export type SessioniCountOutputType = {
    ecoscores: number
  }

  export type SessioniCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ecoscores?: boolean | SessioniCountOutputTypeCountEcoscoresArgs
  }

  // Custom InputTypes
  /**
   * SessioniCountOutputType without action
   */
  export type SessioniCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessioniCountOutputType
     */
    select?: SessioniCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SessioniCountOutputType without action
   */
  export type SessioniCountOutputTypeCountEcoscoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ecoscoresWhereInput
  }


  /**
   * Count Type VettureCountOutputType
   */

  export type VettureCountOutputType = {
    propriet_: number
  }

  export type VettureCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    propriet_?: boolean | VettureCountOutputTypeCountPropriet_Args
  }

  // Custom InputTypes
  /**
   * VettureCountOutputType without action
   */
  export type VettureCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VettureCountOutputType
     */
    select?: VettureCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VettureCountOutputType without action
   */
  export type VettureCountOutputTypeCountPropriet_Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: propriet_WhereInput
  }


  /**
   * Models
   */

  /**
   * Model area
   */

  export type AggregateArea = {
    _count: AreaCountAggregateOutputType | null
    _avg: AreaAvgAggregateOutputType | null
    _sum: AreaSumAggregateOutputType | null
    _min: AreaMinAggregateOutputType | null
    _max: AreaMaxAggregateOutputType | null
  }

  export type AreaAvgAggregateOutputType = {
    id: number | null
    id_comune: number | null
  }

  export type AreaSumAggregateOutputType = {
    id: number | null
    id_comune: number | null
  }

  export type AreaMinAggregateOutputType = {
    id: number | null
    id_comune: number | null
  }

  export type AreaMaxAggregateOutputType = {
    id: number | null
    id_comune: number | null
  }

  export type AreaCountAggregateOutputType = {
    id: number
    id_comune: number
    _all: number
  }


  export type AreaAvgAggregateInputType = {
    id?: true
    id_comune?: true
  }

  export type AreaSumAggregateInputType = {
    id?: true
    id_comune?: true
  }

  export type AreaMinAggregateInputType = {
    id?: true
    id_comune?: true
  }

  export type AreaMaxAggregateInputType = {
    id?: true
    id_comune?: true
  }

  export type AreaCountAggregateInputType = {
    id?: true
    id_comune?: true
    _all?: true
  }

  export type AreaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which area to aggregate.
     */
    where?: areaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of areas to fetch.
     */
    orderBy?: areaOrderByWithRelationInput | areaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: areaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` areas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` areas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned areas
    **/
    _count?: true | AreaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AreaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AreaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AreaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AreaMaxAggregateInputType
  }

  export type GetAreaAggregateType<T extends AreaAggregateArgs> = {
        [P in keyof T & keyof AggregateArea]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArea[P]>
      : GetScalarType<T[P], AggregateArea[P]>
  }




  export type areaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: areaWhereInput
    orderBy?: areaOrderByWithAggregationInput | areaOrderByWithAggregationInput[]
    by: AreaScalarFieldEnum[] | AreaScalarFieldEnum
    having?: areaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AreaCountAggregateInputType | true
    _avg?: AreaAvgAggregateInputType
    _sum?: AreaSumAggregateInputType
    _min?: AreaMinAggregateInputType
    _max?: AreaMaxAggregateInputType
  }

  export type AreaGroupByOutputType = {
    id: number
    id_comune: number
    _count: AreaCountAggregateOutputType | null
    _avg: AreaAvgAggregateOutputType | null
    _sum: AreaSumAggregateOutputType | null
    _min: AreaMinAggregateOutputType | null
    _max: AreaMaxAggregateOutputType | null
  }

  type GetAreaGroupByPayload<T extends areaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AreaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AreaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AreaGroupByOutputType[P]>
            : GetScalarType<T[P], AreaGroupByOutputType[P]>
        }
      >
    >


  export type areaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_comune?: boolean
    comuni?: boolean | comuniDefaultArgs<ExtArgs>
    ecoscores?: boolean | area$ecoscoresArgs<ExtArgs>
    _count?: boolean | AreaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["area"]>

  export type areaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_comune?: boolean
    comuni?: boolean | comuniDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["area"]>

  export type areaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_comune?: boolean
    comuni?: boolean | comuniDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["area"]>

  export type areaSelectScalar = {
    id?: boolean
    id_comune?: boolean
  }

  export type areaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "id_comune", ExtArgs["result"]["area"]>
  export type areaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comuni?: boolean | comuniDefaultArgs<ExtArgs>
    ecoscores?: boolean | area$ecoscoresArgs<ExtArgs>
    _count?: boolean | AreaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type areaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comuni?: boolean | comuniDefaultArgs<ExtArgs>
  }
  export type areaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comuni?: boolean | comuniDefaultArgs<ExtArgs>
  }

  export type $areaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "area"
    objects: {
      comuni: Prisma.$comuniPayload<ExtArgs>
      ecoscores: Prisma.$ecoscoresPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      id_comune: number
    }, ExtArgs["result"]["area"]>
    composites: {}
  }

  type areaGetPayload<S extends boolean | null | undefined | areaDefaultArgs> = $Result.GetResult<Prisma.$areaPayload, S>

  type areaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<areaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AreaCountAggregateInputType | true
    }

  export interface areaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['area'], meta: { name: 'area' } }
    /**
     * Find zero or one Area that matches the filter.
     * @param {areaFindUniqueArgs} args - Arguments to find a Area
     * @example
     * // Get one Area
     * const area = await prisma.area.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends areaFindUniqueArgs>(args: SelectSubset<T, areaFindUniqueArgs<ExtArgs>>): Prisma__areaClient<$Result.GetResult<Prisma.$areaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Area that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {areaFindUniqueOrThrowArgs} args - Arguments to find a Area
     * @example
     * // Get one Area
     * const area = await prisma.area.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends areaFindUniqueOrThrowArgs>(args: SelectSubset<T, areaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__areaClient<$Result.GetResult<Prisma.$areaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Area that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {areaFindFirstArgs} args - Arguments to find a Area
     * @example
     * // Get one Area
     * const area = await prisma.area.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends areaFindFirstArgs>(args?: SelectSubset<T, areaFindFirstArgs<ExtArgs>>): Prisma__areaClient<$Result.GetResult<Prisma.$areaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Area that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {areaFindFirstOrThrowArgs} args - Arguments to find a Area
     * @example
     * // Get one Area
     * const area = await prisma.area.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends areaFindFirstOrThrowArgs>(args?: SelectSubset<T, areaFindFirstOrThrowArgs<ExtArgs>>): Prisma__areaClient<$Result.GetResult<Prisma.$areaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Areas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {areaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Areas
     * const areas = await prisma.area.findMany()
     * 
     * // Get first 10 Areas
     * const areas = await prisma.area.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const areaWithIdOnly = await prisma.area.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends areaFindManyArgs>(args?: SelectSubset<T, areaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$areaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Area.
     * @param {areaCreateArgs} args - Arguments to create a Area.
     * @example
     * // Create one Area
     * const Area = await prisma.area.create({
     *   data: {
     *     // ... data to create a Area
     *   }
     * })
     * 
     */
    create<T extends areaCreateArgs>(args: SelectSubset<T, areaCreateArgs<ExtArgs>>): Prisma__areaClient<$Result.GetResult<Prisma.$areaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Areas.
     * @param {areaCreateManyArgs} args - Arguments to create many Areas.
     * @example
     * // Create many Areas
     * const area = await prisma.area.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends areaCreateManyArgs>(args?: SelectSubset<T, areaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Areas and returns the data saved in the database.
     * @param {areaCreateManyAndReturnArgs} args - Arguments to create many Areas.
     * @example
     * // Create many Areas
     * const area = await prisma.area.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Areas and only return the `id`
     * const areaWithIdOnly = await prisma.area.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends areaCreateManyAndReturnArgs>(args?: SelectSubset<T, areaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$areaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Area.
     * @param {areaDeleteArgs} args - Arguments to delete one Area.
     * @example
     * // Delete one Area
     * const Area = await prisma.area.delete({
     *   where: {
     *     // ... filter to delete one Area
     *   }
     * })
     * 
     */
    delete<T extends areaDeleteArgs>(args: SelectSubset<T, areaDeleteArgs<ExtArgs>>): Prisma__areaClient<$Result.GetResult<Prisma.$areaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Area.
     * @param {areaUpdateArgs} args - Arguments to update one Area.
     * @example
     * // Update one Area
     * const area = await prisma.area.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends areaUpdateArgs>(args: SelectSubset<T, areaUpdateArgs<ExtArgs>>): Prisma__areaClient<$Result.GetResult<Prisma.$areaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Areas.
     * @param {areaDeleteManyArgs} args - Arguments to filter Areas to delete.
     * @example
     * // Delete a few Areas
     * const { count } = await prisma.area.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends areaDeleteManyArgs>(args?: SelectSubset<T, areaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Areas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {areaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Areas
     * const area = await prisma.area.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends areaUpdateManyArgs>(args: SelectSubset<T, areaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Areas and returns the data updated in the database.
     * @param {areaUpdateManyAndReturnArgs} args - Arguments to update many Areas.
     * @example
     * // Update many Areas
     * const area = await prisma.area.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Areas and only return the `id`
     * const areaWithIdOnly = await prisma.area.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends areaUpdateManyAndReturnArgs>(args: SelectSubset<T, areaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$areaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Area.
     * @param {areaUpsertArgs} args - Arguments to update or create a Area.
     * @example
     * // Update or create a Area
     * const area = await prisma.area.upsert({
     *   create: {
     *     // ... data to create a Area
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Area we want to update
     *   }
     * })
     */
    upsert<T extends areaUpsertArgs>(args: SelectSubset<T, areaUpsertArgs<ExtArgs>>): Prisma__areaClient<$Result.GetResult<Prisma.$areaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Areas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {areaCountArgs} args - Arguments to filter Areas to count.
     * @example
     * // Count the number of Areas
     * const count = await prisma.area.count({
     *   where: {
     *     // ... the filter for the Areas we want to count
     *   }
     * })
    **/
    count<T extends areaCountArgs>(
      args?: Subset<T, areaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AreaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Area.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AreaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AreaAggregateArgs>(args: Subset<T, AreaAggregateArgs>): Prisma.PrismaPromise<GetAreaAggregateType<T>>

    /**
     * Group by Area.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {areaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends areaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: areaGroupByArgs['orderBy'] }
        : { orderBy?: areaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, areaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAreaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the area model
   */
  readonly fields: areaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for area.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__areaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    comuni<T extends comuniDefaultArgs<ExtArgs> = {}>(args?: Subset<T, comuniDefaultArgs<ExtArgs>>): Prisma__comuniClient<$Result.GetResult<Prisma.$comuniPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    ecoscores<T extends area$ecoscoresArgs<ExtArgs> = {}>(args?: Subset<T, area$ecoscoresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ecoscoresPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the area model
   */
  interface areaFieldRefs {
    readonly id: FieldRef<"area", 'Int'>
    readonly id_comune: FieldRef<"area", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * area findUnique
   */
  export type areaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the area
     */
    select?: areaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the area
     */
    omit?: areaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: areaInclude<ExtArgs> | null
    /**
     * Filter, which area to fetch.
     */
    where: areaWhereUniqueInput
  }

  /**
   * area findUniqueOrThrow
   */
  export type areaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the area
     */
    select?: areaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the area
     */
    omit?: areaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: areaInclude<ExtArgs> | null
    /**
     * Filter, which area to fetch.
     */
    where: areaWhereUniqueInput
  }

  /**
   * area findFirst
   */
  export type areaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the area
     */
    select?: areaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the area
     */
    omit?: areaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: areaInclude<ExtArgs> | null
    /**
     * Filter, which area to fetch.
     */
    where?: areaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of areas to fetch.
     */
    orderBy?: areaOrderByWithRelationInput | areaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for areas.
     */
    cursor?: areaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` areas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` areas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of areas.
     */
    distinct?: AreaScalarFieldEnum | AreaScalarFieldEnum[]
  }

  /**
   * area findFirstOrThrow
   */
  export type areaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the area
     */
    select?: areaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the area
     */
    omit?: areaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: areaInclude<ExtArgs> | null
    /**
     * Filter, which area to fetch.
     */
    where?: areaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of areas to fetch.
     */
    orderBy?: areaOrderByWithRelationInput | areaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for areas.
     */
    cursor?: areaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` areas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` areas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of areas.
     */
    distinct?: AreaScalarFieldEnum | AreaScalarFieldEnum[]
  }

  /**
   * area findMany
   */
  export type areaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the area
     */
    select?: areaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the area
     */
    omit?: areaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: areaInclude<ExtArgs> | null
    /**
     * Filter, which areas to fetch.
     */
    where?: areaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of areas to fetch.
     */
    orderBy?: areaOrderByWithRelationInput | areaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing areas.
     */
    cursor?: areaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` areas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` areas.
     */
    skip?: number
    distinct?: AreaScalarFieldEnum | AreaScalarFieldEnum[]
  }

  /**
   * area create
   */
  export type areaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the area
     */
    select?: areaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the area
     */
    omit?: areaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: areaInclude<ExtArgs> | null
    /**
     * The data needed to create a area.
     */
    data: XOR<areaCreateInput, areaUncheckedCreateInput>
  }

  /**
   * area createMany
   */
  export type areaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many areas.
     */
    data: areaCreateManyInput | areaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * area createManyAndReturn
   */
  export type areaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the area
     */
    select?: areaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the area
     */
    omit?: areaOmit<ExtArgs> | null
    /**
     * The data used to create many areas.
     */
    data: areaCreateManyInput | areaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: areaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * area update
   */
  export type areaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the area
     */
    select?: areaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the area
     */
    omit?: areaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: areaInclude<ExtArgs> | null
    /**
     * The data needed to update a area.
     */
    data: XOR<areaUpdateInput, areaUncheckedUpdateInput>
    /**
     * Choose, which area to update.
     */
    where: areaWhereUniqueInput
  }

  /**
   * area updateMany
   */
  export type areaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update areas.
     */
    data: XOR<areaUpdateManyMutationInput, areaUncheckedUpdateManyInput>
    /**
     * Filter which areas to update
     */
    where?: areaWhereInput
    /**
     * Limit how many areas to update.
     */
    limit?: number
  }

  /**
   * area updateManyAndReturn
   */
  export type areaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the area
     */
    select?: areaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the area
     */
    omit?: areaOmit<ExtArgs> | null
    /**
     * The data used to update areas.
     */
    data: XOR<areaUpdateManyMutationInput, areaUncheckedUpdateManyInput>
    /**
     * Filter which areas to update
     */
    where?: areaWhereInput
    /**
     * Limit how many areas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: areaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * area upsert
   */
  export type areaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the area
     */
    select?: areaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the area
     */
    omit?: areaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: areaInclude<ExtArgs> | null
    /**
     * The filter to search for the area to update in case it exists.
     */
    where: areaWhereUniqueInput
    /**
     * In case the area found by the `where` argument doesn't exist, create a new area with this data.
     */
    create: XOR<areaCreateInput, areaUncheckedCreateInput>
    /**
     * In case the area was found with the provided `where` argument, update it with this data.
     */
    update: XOR<areaUpdateInput, areaUncheckedUpdateInput>
  }

  /**
   * area delete
   */
  export type areaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the area
     */
    select?: areaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the area
     */
    omit?: areaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: areaInclude<ExtArgs> | null
    /**
     * Filter which area to delete.
     */
    where: areaWhereUniqueInput
  }

  /**
   * area deleteMany
   */
  export type areaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which areas to delete
     */
    where?: areaWhereInput
    /**
     * Limit how many areas to delete.
     */
    limit?: number
  }

  /**
   * area.ecoscores
   */
  export type area$ecoscoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ecoscores
     */
    select?: ecoscoresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ecoscores
     */
    omit?: ecoscoresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ecoscoresInclude<ExtArgs> | null
    where?: ecoscoresWhereInput
    orderBy?: ecoscoresOrderByWithRelationInput | ecoscoresOrderByWithRelationInput[]
    cursor?: ecoscoresWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EcoscoresScalarFieldEnum | EcoscoresScalarFieldEnum[]
  }

  /**
   * area without action
   */
  export type areaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the area
     */
    select?: areaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the area
     */
    omit?: areaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: areaInclude<ExtArgs> | null
  }


  /**
   * Model cittadini
   */

  export type AggregateCittadini = {
    _count: CittadiniCountAggregateOutputType | null
    _avg: CittadiniAvgAggregateOutputType | null
    _sum: CittadiniSumAggregateOutputType | null
    _min: CittadiniMinAggregateOutputType | null
    _max: CittadiniMaxAggregateOutputType | null
  }

  export type CittadiniAvgAggregateOutputType = {
    id: number | null
  }

  export type CittadiniSumAggregateOutputType = {
    id: number | null
  }

  export type CittadiniMinAggregateOutputType = {
    id: number | null
    nome: string | null
    email: string | null
    data_nascita: Date | null
    password: string | null
  }

  export type CittadiniMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    email: string | null
    data_nascita: Date | null
    password: string | null
  }

  export type CittadiniCountAggregateOutputType = {
    id: number
    nome: number
    email: number
    data_nascita: number
    password: number
    _all: number
  }


  export type CittadiniAvgAggregateInputType = {
    id?: true
  }

  export type CittadiniSumAggregateInputType = {
    id?: true
  }

  export type CittadiniMinAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    data_nascita?: true
    password?: true
  }

  export type CittadiniMaxAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    data_nascita?: true
    password?: true
  }

  export type CittadiniCountAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    data_nascita?: true
    password?: true
    _all?: true
  }

  export type CittadiniAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cittadini to aggregate.
     */
    where?: cittadiniWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cittadinis to fetch.
     */
    orderBy?: cittadiniOrderByWithRelationInput | cittadiniOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: cittadiniWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cittadinis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cittadinis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned cittadinis
    **/
    _count?: true | CittadiniCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CittadiniAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CittadiniSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CittadiniMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CittadiniMaxAggregateInputType
  }

  export type GetCittadiniAggregateType<T extends CittadiniAggregateArgs> = {
        [P in keyof T & keyof AggregateCittadini]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCittadini[P]>
      : GetScalarType<T[P], AggregateCittadini[P]>
  }




  export type cittadiniGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: cittadiniWhereInput
    orderBy?: cittadiniOrderByWithAggregationInput | cittadiniOrderByWithAggregationInput[]
    by: CittadiniScalarFieldEnum[] | CittadiniScalarFieldEnum
    having?: cittadiniScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CittadiniCountAggregateInputType | true
    _avg?: CittadiniAvgAggregateInputType
    _sum?: CittadiniSumAggregateInputType
    _min?: CittadiniMinAggregateInputType
    _max?: CittadiniMaxAggregateInputType
  }

  export type CittadiniGroupByOutputType = {
    id: number
    nome: string | null
    email: string | null
    data_nascita: Date | null
    password: string
    _count: CittadiniCountAggregateOutputType | null
    _avg: CittadiniAvgAggregateOutputType | null
    _sum: CittadiniSumAggregateOutputType | null
    _min: CittadiniMinAggregateOutputType | null
    _max: CittadiniMaxAggregateOutputType | null
  }

  type GetCittadiniGroupByPayload<T extends cittadiniGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CittadiniGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CittadiniGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CittadiniGroupByOutputType[P]>
            : GetScalarType<T[P], CittadiniGroupByOutputType[P]>
        }
      >
    >


  export type cittadiniSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    data_nascita?: boolean
    password?: boolean
    propriet_?: boolean | cittadini$propriet_Args<ExtArgs>
    sessioni?: boolean | cittadini$sessioniArgs<ExtArgs>
    _count?: boolean | CittadiniCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cittadini"]>

  export type cittadiniSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    data_nascita?: boolean
    password?: boolean
  }, ExtArgs["result"]["cittadini"]>

  export type cittadiniSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    data_nascita?: boolean
    password?: boolean
  }, ExtArgs["result"]["cittadini"]>

  export type cittadiniSelectScalar = {
    id?: boolean
    nome?: boolean
    email?: boolean
    data_nascita?: boolean
    password?: boolean
  }

  export type cittadiniOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "email" | "data_nascita" | "password", ExtArgs["result"]["cittadini"]>
  export type cittadiniInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    propriet_?: boolean | cittadini$propriet_Args<ExtArgs>
    sessioni?: boolean | cittadini$sessioniArgs<ExtArgs>
    _count?: boolean | CittadiniCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type cittadiniIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type cittadiniIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $cittadiniPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "cittadini"
    objects: {
      propriet_: Prisma.$propriet_Payload<ExtArgs>[]
      sessioni: Prisma.$sessioniPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string | null
      email: string | null
      data_nascita: Date | null
      password: string
    }, ExtArgs["result"]["cittadini"]>
    composites: {}
  }

  type cittadiniGetPayload<S extends boolean | null | undefined | cittadiniDefaultArgs> = $Result.GetResult<Prisma.$cittadiniPayload, S>

  type cittadiniCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<cittadiniFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CittadiniCountAggregateInputType | true
    }

  export interface cittadiniDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['cittadini'], meta: { name: 'cittadini' } }
    /**
     * Find zero or one Cittadini that matches the filter.
     * @param {cittadiniFindUniqueArgs} args - Arguments to find a Cittadini
     * @example
     * // Get one Cittadini
     * const cittadini = await prisma.cittadini.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends cittadiniFindUniqueArgs>(args: SelectSubset<T, cittadiniFindUniqueArgs<ExtArgs>>): Prisma__cittadiniClient<$Result.GetResult<Prisma.$cittadiniPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cittadini that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {cittadiniFindUniqueOrThrowArgs} args - Arguments to find a Cittadini
     * @example
     * // Get one Cittadini
     * const cittadini = await prisma.cittadini.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends cittadiniFindUniqueOrThrowArgs>(args: SelectSubset<T, cittadiniFindUniqueOrThrowArgs<ExtArgs>>): Prisma__cittadiniClient<$Result.GetResult<Prisma.$cittadiniPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cittadini that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cittadiniFindFirstArgs} args - Arguments to find a Cittadini
     * @example
     * // Get one Cittadini
     * const cittadini = await prisma.cittadini.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends cittadiniFindFirstArgs>(args?: SelectSubset<T, cittadiniFindFirstArgs<ExtArgs>>): Prisma__cittadiniClient<$Result.GetResult<Prisma.$cittadiniPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cittadini that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cittadiniFindFirstOrThrowArgs} args - Arguments to find a Cittadini
     * @example
     * // Get one Cittadini
     * const cittadini = await prisma.cittadini.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends cittadiniFindFirstOrThrowArgs>(args?: SelectSubset<T, cittadiniFindFirstOrThrowArgs<ExtArgs>>): Prisma__cittadiniClient<$Result.GetResult<Prisma.$cittadiniPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cittadinis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cittadiniFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cittadinis
     * const cittadinis = await prisma.cittadini.findMany()
     * 
     * // Get first 10 Cittadinis
     * const cittadinis = await prisma.cittadini.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cittadiniWithIdOnly = await prisma.cittadini.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends cittadiniFindManyArgs>(args?: SelectSubset<T, cittadiniFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cittadiniPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cittadini.
     * @param {cittadiniCreateArgs} args - Arguments to create a Cittadini.
     * @example
     * // Create one Cittadini
     * const Cittadini = await prisma.cittadini.create({
     *   data: {
     *     // ... data to create a Cittadini
     *   }
     * })
     * 
     */
    create<T extends cittadiniCreateArgs>(args: SelectSubset<T, cittadiniCreateArgs<ExtArgs>>): Prisma__cittadiniClient<$Result.GetResult<Prisma.$cittadiniPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cittadinis.
     * @param {cittadiniCreateManyArgs} args - Arguments to create many Cittadinis.
     * @example
     * // Create many Cittadinis
     * const cittadini = await prisma.cittadini.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends cittadiniCreateManyArgs>(args?: SelectSubset<T, cittadiniCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cittadinis and returns the data saved in the database.
     * @param {cittadiniCreateManyAndReturnArgs} args - Arguments to create many Cittadinis.
     * @example
     * // Create many Cittadinis
     * const cittadini = await prisma.cittadini.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cittadinis and only return the `id`
     * const cittadiniWithIdOnly = await prisma.cittadini.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends cittadiniCreateManyAndReturnArgs>(args?: SelectSubset<T, cittadiniCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cittadiniPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Cittadini.
     * @param {cittadiniDeleteArgs} args - Arguments to delete one Cittadini.
     * @example
     * // Delete one Cittadini
     * const Cittadini = await prisma.cittadini.delete({
     *   where: {
     *     // ... filter to delete one Cittadini
     *   }
     * })
     * 
     */
    delete<T extends cittadiniDeleteArgs>(args: SelectSubset<T, cittadiniDeleteArgs<ExtArgs>>): Prisma__cittadiniClient<$Result.GetResult<Prisma.$cittadiniPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cittadini.
     * @param {cittadiniUpdateArgs} args - Arguments to update one Cittadini.
     * @example
     * // Update one Cittadini
     * const cittadini = await prisma.cittadini.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends cittadiniUpdateArgs>(args: SelectSubset<T, cittadiniUpdateArgs<ExtArgs>>): Prisma__cittadiniClient<$Result.GetResult<Prisma.$cittadiniPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cittadinis.
     * @param {cittadiniDeleteManyArgs} args - Arguments to filter Cittadinis to delete.
     * @example
     * // Delete a few Cittadinis
     * const { count } = await prisma.cittadini.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends cittadiniDeleteManyArgs>(args?: SelectSubset<T, cittadiniDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cittadinis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cittadiniUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cittadinis
     * const cittadini = await prisma.cittadini.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends cittadiniUpdateManyArgs>(args: SelectSubset<T, cittadiniUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cittadinis and returns the data updated in the database.
     * @param {cittadiniUpdateManyAndReturnArgs} args - Arguments to update many Cittadinis.
     * @example
     * // Update many Cittadinis
     * const cittadini = await prisma.cittadini.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cittadinis and only return the `id`
     * const cittadiniWithIdOnly = await prisma.cittadini.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends cittadiniUpdateManyAndReturnArgs>(args: SelectSubset<T, cittadiniUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cittadiniPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Cittadini.
     * @param {cittadiniUpsertArgs} args - Arguments to update or create a Cittadini.
     * @example
     * // Update or create a Cittadini
     * const cittadini = await prisma.cittadini.upsert({
     *   create: {
     *     // ... data to create a Cittadini
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cittadini we want to update
     *   }
     * })
     */
    upsert<T extends cittadiniUpsertArgs>(args: SelectSubset<T, cittadiniUpsertArgs<ExtArgs>>): Prisma__cittadiniClient<$Result.GetResult<Prisma.$cittadiniPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cittadinis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cittadiniCountArgs} args - Arguments to filter Cittadinis to count.
     * @example
     * // Count the number of Cittadinis
     * const count = await prisma.cittadini.count({
     *   where: {
     *     // ... the filter for the Cittadinis we want to count
     *   }
     * })
    **/
    count<T extends cittadiniCountArgs>(
      args?: Subset<T, cittadiniCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CittadiniCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cittadini.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CittadiniAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CittadiniAggregateArgs>(args: Subset<T, CittadiniAggregateArgs>): Prisma.PrismaPromise<GetCittadiniAggregateType<T>>

    /**
     * Group by Cittadini.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cittadiniGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends cittadiniGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: cittadiniGroupByArgs['orderBy'] }
        : { orderBy?: cittadiniGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, cittadiniGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCittadiniGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the cittadini model
   */
  readonly fields: cittadiniFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for cittadini.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__cittadiniClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    propriet_<T extends cittadini$propriet_Args<ExtArgs> = {}>(args?: Subset<T, cittadini$propriet_Args<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$propriet_Payload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessioni<T extends cittadini$sessioniArgs<ExtArgs> = {}>(args?: Subset<T, cittadini$sessioniArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sessioniPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the cittadini model
   */
  interface cittadiniFieldRefs {
    readonly id: FieldRef<"cittadini", 'Int'>
    readonly nome: FieldRef<"cittadini", 'String'>
    readonly email: FieldRef<"cittadini", 'String'>
    readonly data_nascita: FieldRef<"cittadini", 'DateTime'>
    readonly password: FieldRef<"cittadini", 'String'>
  }
    

  // Custom InputTypes
  /**
   * cittadini findUnique
   */
  export type cittadiniFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cittadini
     */
    select?: cittadiniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cittadini
     */
    omit?: cittadiniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cittadiniInclude<ExtArgs> | null
    /**
     * Filter, which cittadini to fetch.
     */
    where: cittadiniWhereUniqueInput
  }

  /**
   * cittadini findUniqueOrThrow
   */
  export type cittadiniFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cittadini
     */
    select?: cittadiniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cittadini
     */
    omit?: cittadiniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cittadiniInclude<ExtArgs> | null
    /**
     * Filter, which cittadini to fetch.
     */
    where: cittadiniWhereUniqueInput
  }

  /**
   * cittadini findFirst
   */
  export type cittadiniFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cittadini
     */
    select?: cittadiniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cittadini
     */
    omit?: cittadiniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cittadiniInclude<ExtArgs> | null
    /**
     * Filter, which cittadini to fetch.
     */
    where?: cittadiniWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cittadinis to fetch.
     */
    orderBy?: cittadiniOrderByWithRelationInput | cittadiniOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cittadinis.
     */
    cursor?: cittadiniWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cittadinis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cittadinis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cittadinis.
     */
    distinct?: CittadiniScalarFieldEnum | CittadiniScalarFieldEnum[]
  }

  /**
   * cittadini findFirstOrThrow
   */
  export type cittadiniFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cittadini
     */
    select?: cittadiniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cittadini
     */
    omit?: cittadiniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cittadiniInclude<ExtArgs> | null
    /**
     * Filter, which cittadini to fetch.
     */
    where?: cittadiniWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cittadinis to fetch.
     */
    orderBy?: cittadiniOrderByWithRelationInput | cittadiniOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cittadinis.
     */
    cursor?: cittadiniWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cittadinis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cittadinis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cittadinis.
     */
    distinct?: CittadiniScalarFieldEnum | CittadiniScalarFieldEnum[]
  }

  /**
   * cittadini findMany
   */
  export type cittadiniFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cittadini
     */
    select?: cittadiniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cittadini
     */
    omit?: cittadiniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cittadiniInclude<ExtArgs> | null
    /**
     * Filter, which cittadinis to fetch.
     */
    where?: cittadiniWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cittadinis to fetch.
     */
    orderBy?: cittadiniOrderByWithRelationInput | cittadiniOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing cittadinis.
     */
    cursor?: cittadiniWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cittadinis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cittadinis.
     */
    skip?: number
    distinct?: CittadiniScalarFieldEnum | CittadiniScalarFieldEnum[]
  }

  /**
   * cittadini create
   */
  export type cittadiniCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cittadini
     */
    select?: cittadiniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cittadini
     */
    omit?: cittadiniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cittadiniInclude<ExtArgs> | null
    /**
     * The data needed to create a cittadini.
     */
    data: XOR<cittadiniCreateInput, cittadiniUncheckedCreateInput>
  }

  /**
   * cittadini createMany
   */
  export type cittadiniCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many cittadinis.
     */
    data: cittadiniCreateManyInput | cittadiniCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * cittadini createManyAndReturn
   */
  export type cittadiniCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cittadini
     */
    select?: cittadiniSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the cittadini
     */
    omit?: cittadiniOmit<ExtArgs> | null
    /**
     * The data used to create many cittadinis.
     */
    data: cittadiniCreateManyInput | cittadiniCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * cittadini update
   */
  export type cittadiniUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cittadini
     */
    select?: cittadiniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cittadini
     */
    omit?: cittadiniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cittadiniInclude<ExtArgs> | null
    /**
     * The data needed to update a cittadini.
     */
    data: XOR<cittadiniUpdateInput, cittadiniUncheckedUpdateInput>
    /**
     * Choose, which cittadini to update.
     */
    where: cittadiniWhereUniqueInput
  }

  /**
   * cittadini updateMany
   */
  export type cittadiniUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update cittadinis.
     */
    data: XOR<cittadiniUpdateManyMutationInput, cittadiniUncheckedUpdateManyInput>
    /**
     * Filter which cittadinis to update
     */
    where?: cittadiniWhereInput
    /**
     * Limit how many cittadinis to update.
     */
    limit?: number
  }

  /**
   * cittadini updateManyAndReturn
   */
  export type cittadiniUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cittadini
     */
    select?: cittadiniSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the cittadini
     */
    omit?: cittadiniOmit<ExtArgs> | null
    /**
     * The data used to update cittadinis.
     */
    data: XOR<cittadiniUpdateManyMutationInput, cittadiniUncheckedUpdateManyInput>
    /**
     * Filter which cittadinis to update
     */
    where?: cittadiniWhereInput
    /**
     * Limit how many cittadinis to update.
     */
    limit?: number
  }

  /**
   * cittadini upsert
   */
  export type cittadiniUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cittadini
     */
    select?: cittadiniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cittadini
     */
    omit?: cittadiniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cittadiniInclude<ExtArgs> | null
    /**
     * The filter to search for the cittadini to update in case it exists.
     */
    where: cittadiniWhereUniqueInput
    /**
     * In case the cittadini found by the `where` argument doesn't exist, create a new cittadini with this data.
     */
    create: XOR<cittadiniCreateInput, cittadiniUncheckedCreateInput>
    /**
     * In case the cittadini was found with the provided `where` argument, update it with this data.
     */
    update: XOR<cittadiniUpdateInput, cittadiniUncheckedUpdateInput>
  }

  /**
   * cittadini delete
   */
  export type cittadiniDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cittadini
     */
    select?: cittadiniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cittadini
     */
    omit?: cittadiniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cittadiniInclude<ExtArgs> | null
    /**
     * Filter which cittadini to delete.
     */
    where: cittadiniWhereUniqueInput
  }

  /**
   * cittadini deleteMany
   */
  export type cittadiniDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cittadinis to delete
     */
    where?: cittadiniWhereInput
    /**
     * Limit how many cittadinis to delete.
     */
    limit?: number
  }

  /**
   * cittadini.propriet_
   */
  export type cittadini$propriet_Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propriet_
     */
    select?: propriet_Select<ExtArgs> | null
    /**
     * Omit specific fields from the propriet_
     */
    omit?: propriet_Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propriet_Include<ExtArgs> | null
    where?: propriet_WhereInput
    orderBy?: propriet_OrderByWithRelationInput | propriet_OrderByWithRelationInput[]
    cursor?: propriet_WhereUniqueInput
    take?: number
    skip?: number
    distinct?: Propriet_ScalarFieldEnum | Propriet_ScalarFieldEnum[]
  }

  /**
   * cittadini.sessioni
   */
  export type cittadini$sessioniArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessioni
     */
    select?: sessioniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sessioni
     */
    omit?: sessioniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessioniInclude<ExtArgs> | null
    where?: sessioniWhereInput
    orderBy?: sessioniOrderByWithRelationInput | sessioniOrderByWithRelationInput[]
    cursor?: sessioniWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessioniScalarFieldEnum | SessioniScalarFieldEnum[]
  }

  /**
   * cittadini without action
   */
  export type cittadiniDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cittadini
     */
    select?: cittadiniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cittadini
     */
    omit?: cittadiniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cittadiniInclude<ExtArgs> | null
  }


  /**
   * Model comuni
   */

  export type AggregateComuni = {
    _count: ComuniCountAggregateOutputType | null
    _avg: ComuniAvgAggregateOutputType | null
    _sum: ComuniSumAggregateOutputType | null
    _min: ComuniMinAggregateOutputType | null
    _max: ComuniMaxAggregateOutputType | null
  }

  export type ComuniAvgAggregateOutputType = {
    id: number | null
  }

  export type ComuniSumAggregateOutputType = {
    id: number | null
  }

  export type ComuniMinAggregateOutputType = {
    id: number | null
    nome: string | null
    provincia: string | null
    regione: string | null
    email: string | null
    password: string | null
  }

  export type ComuniMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    provincia: string | null
    regione: string | null
    email: string | null
    password: string | null
  }

  export type ComuniCountAggregateOutputType = {
    id: number
    nome: number
    provincia: number
    regione: number
    email: number
    password: number
    _all: number
  }


  export type ComuniAvgAggregateInputType = {
    id?: true
  }

  export type ComuniSumAggregateInputType = {
    id?: true
  }

  export type ComuniMinAggregateInputType = {
    id?: true
    nome?: true
    provincia?: true
    regione?: true
    email?: true
    password?: true
  }

  export type ComuniMaxAggregateInputType = {
    id?: true
    nome?: true
    provincia?: true
    regione?: true
    email?: true
    password?: true
  }

  export type ComuniCountAggregateInputType = {
    id?: true
    nome?: true
    provincia?: true
    regione?: true
    email?: true
    password?: true
    _all?: true
  }

  export type ComuniAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which comuni to aggregate.
     */
    where?: comuniWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of comunis to fetch.
     */
    orderBy?: comuniOrderByWithRelationInput | comuniOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: comuniWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` comunis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` comunis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned comunis
    **/
    _count?: true | ComuniCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ComuniAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ComuniSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComuniMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComuniMaxAggregateInputType
  }

  export type GetComuniAggregateType<T extends ComuniAggregateArgs> = {
        [P in keyof T & keyof AggregateComuni]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComuni[P]>
      : GetScalarType<T[P], AggregateComuni[P]>
  }




  export type comuniGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: comuniWhereInput
    orderBy?: comuniOrderByWithAggregationInput | comuniOrderByWithAggregationInput[]
    by: ComuniScalarFieldEnum[] | ComuniScalarFieldEnum
    having?: comuniScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComuniCountAggregateInputType | true
    _avg?: ComuniAvgAggregateInputType
    _sum?: ComuniSumAggregateInputType
    _min?: ComuniMinAggregateInputType
    _max?: ComuniMaxAggregateInputType
  }

  export type ComuniGroupByOutputType = {
    id: number
    nome: string
    provincia: string
    regione: string
    email: string | null
    password: string
    _count: ComuniCountAggregateOutputType | null
    _avg: ComuniAvgAggregateOutputType | null
    _sum: ComuniSumAggregateOutputType | null
    _min: ComuniMinAggregateOutputType | null
    _max: ComuniMaxAggregateOutputType | null
  }

  type GetComuniGroupByPayload<T extends comuniGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComuniGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComuniGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComuniGroupByOutputType[P]>
            : GetScalarType<T[P], ComuniGroupByOutputType[P]>
        }
      >
    >


  export type comuniSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    provincia?: boolean
    regione?: boolean
    email?: boolean
    password?: boolean
    area?: boolean | comuni$areaArgs<ExtArgs>
    _count?: boolean | ComuniCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comuni"]>

  export type comuniSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    provincia?: boolean
    regione?: boolean
    email?: boolean
    password?: boolean
  }, ExtArgs["result"]["comuni"]>

  export type comuniSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    provincia?: boolean
    regione?: boolean
    email?: boolean
    password?: boolean
  }, ExtArgs["result"]["comuni"]>

  export type comuniSelectScalar = {
    id?: boolean
    nome?: boolean
    provincia?: boolean
    regione?: boolean
    email?: boolean
    password?: boolean
  }

  export type comuniOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "provincia" | "regione" | "email" | "password", ExtArgs["result"]["comuni"]>
  export type comuniInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    area?: boolean | comuni$areaArgs<ExtArgs>
    _count?: boolean | ComuniCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type comuniIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type comuniIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $comuniPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "comuni"
    objects: {
      area: Prisma.$areaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string
      provincia: string
      regione: string
      email: string | null
      password: string
    }, ExtArgs["result"]["comuni"]>
    composites: {}
  }

  type comuniGetPayload<S extends boolean | null | undefined | comuniDefaultArgs> = $Result.GetResult<Prisma.$comuniPayload, S>

  type comuniCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<comuniFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ComuniCountAggregateInputType | true
    }

  export interface comuniDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['comuni'], meta: { name: 'comuni' } }
    /**
     * Find zero or one Comuni that matches the filter.
     * @param {comuniFindUniqueArgs} args - Arguments to find a Comuni
     * @example
     * // Get one Comuni
     * const comuni = await prisma.comuni.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends comuniFindUniqueArgs>(args: SelectSubset<T, comuniFindUniqueArgs<ExtArgs>>): Prisma__comuniClient<$Result.GetResult<Prisma.$comuniPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comuni that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {comuniFindUniqueOrThrowArgs} args - Arguments to find a Comuni
     * @example
     * // Get one Comuni
     * const comuni = await prisma.comuni.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends comuniFindUniqueOrThrowArgs>(args: SelectSubset<T, comuniFindUniqueOrThrowArgs<ExtArgs>>): Prisma__comuniClient<$Result.GetResult<Prisma.$comuniPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comuni that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {comuniFindFirstArgs} args - Arguments to find a Comuni
     * @example
     * // Get one Comuni
     * const comuni = await prisma.comuni.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends comuniFindFirstArgs>(args?: SelectSubset<T, comuniFindFirstArgs<ExtArgs>>): Prisma__comuniClient<$Result.GetResult<Prisma.$comuniPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comuni that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {comuniFindFirstOrThrowArgs} args - Arguments to find a Comuni
     * @example
     * // Get one Comuni
     * const comuni = await prisma.comuni.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends comuniFindFirstOrThrowArgs>(args?: SelectSubset<T, comuniFindFirstOrThrowArgs<ExtArgs>>): Prisma__comuniClient<$Result.GetResult<Prisma.$comuniPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comunis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {comuniFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comunis
     * const comunis = await prisma.comuni.findMany()
     * 
     * // Get first 10 Comunis
     * const comunis = await prisma.comuni.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const comuniWithIdOnly = await prisma.comuni.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends comuniFindManyArgs>(args?: SelectSubset<T, comuniFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$comuniPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comuni.
     * @param {comuniCreateArgs} args - Arguments to create a Comuni.
     * @example
     * // Create one Comuni
     * const Comuni = await prisma.comuni.create({
     *   data: {
     *     // ... data to create a Comuni
     *   }
     * })
     * 
     */
    create<T extends comuniCreateArgs>(args: SelectSubset<T, comuniCreateArgs<ExtArgs>>): Prisma__comuniClient<$Result.GetResult<Prisma.$comuniPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comunis.
     * @param {comuniCreateManyArgs} args - Arguments to create many Comunis.
     * @example
     * // Create many Comunis
     * const comuni = await prisma.comuni.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends comuniCreateManyArgs>(args?: SelectSubset<T, comuniCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Comunis and returns the data saved in the database.
     * @param {comuniCreateManyAndReturnArgs} args - Arguments to create many Comunis.
     * @example
     * // Create many Comunis
     * const comuni = await prisma.comuni.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Comunis and only return the `id`
     * const comuniWithIdOnly = await prisma.comuni.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends comuniCreateManyAndReturnArgs>(args?: SelectSubset<T, comuniCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$comuniPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Comuni.
     * @param {comuniDeleteArgs} args - Arguments to delete one Comuni.
     * @example
     * // Delete one Comuni
     * const Comuni = await prisma.comuni.delete({
     *   where: {
     *     // ... filter to delete one Comuni
     *   }
     * })
     * 
     */
    delete<T extends comuniDeleteArgs>(args: SelectSubset<T, comuniDeleteArgs<ExtArgs>>): Prisma__comuniClient<$Result.GetResult<Prisma.$comuniPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comuni.
     * @param {comuniUpdateArgs} args - Arguments to update one Comuni.
     * @example
     * // Update one Comuni
     * const comuni = await prisma.comuni.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends comuniUpdateArgs>(args: SelectSubset<T, comuniUpdateArgs<ExtArgs>>): Prisma__comuniClient<$Result.GetResult<Prisma.$comuniPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comunis.
     * @param {comuniDeleteManyArgs} args - Arguments to filter Comunis to delete.
     * @example
     * // Delete a few Comunis
     * const { count } = await prisma.comuni.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends comuniDeleteManyArgs>(args?: SelectSubset<T, comuniDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comunis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {comuniUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comunis
     * const comuni = await prisma.comuni.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends comuniUpdateManyArgs>(args: SelectSubset<T, comuniUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comunis and returns the data updated in the database.
     * @param {comuniUpdateManyAndReturnArgs} args - Arguments to update many Comunis.
     * @example
     * // Update many Comunis
     * const comuni = await prisma.comuni.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Comunis and only return the `id`
     * const comuniWithIdOnly = await prisma.comuni.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends comuniUpdateManyAndReturnArgs>(args: SelectSubset<T, comuniUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$comuniPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Comuni.
     * @param {comuniUpsertArgs} args - Arguments to update or create a Comuni.
     * @example
     * // Update or create a Comuni
     * const comuni = await prisma.comuni.upsert({
     *   create: {
     *     // ... data to create a Comuni
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comuni we want to update
     *   }
     * })
     */
    upsert<T extends comuniUpsertArgs>(args: SelectSubset<T, comuniUpsertArgs<ExtArgs>>): Prisma__comuniClient<$Result.GetResult<Prisma.$comuniPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Comunis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {comuniCountArgs} args - Arguments to filter Comunis to count.
     * @example
     * // Count the number of Comunis
     * const count = await prisma.comuni.count({
     *   where: {
     *     // ... the filter for the Comunis we want to count
     *   }
     * })
    **/
    count<T extends comuniCountArgs>(
      args?: Subset<T, comuniCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComuniCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comuni.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComuniAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ComuniAggregateArgs>(args: Subset<T, ComuniAggregateArgs>): Prisma.PrismaPromise<GetComuniAggregateType<T>>

    /**
     * Group by Comuni.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {comuniGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends comuniGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: comuniGroupByArgs['orderBy'] }
        : { orderBy?: comuniGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, comuniGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComuniGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the comuni model
   */
  readonly fields: comuniFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for comuni.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__comuniClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    area<T extends comuni$areaArgs<ExtArgs> = {}>(args?: Subset<T, comuni$areaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$areaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the comuni model
   */
  interface comuniFieldRefs {
    readonly id: FieldRef<"comuni", 'Int'>
    readonly nome: FieldRef<"comuni", 'String'>
    readonly provincia: FieldRef<"comuni", 'String'>
    readonly regione: FieldRef<"comuni", 'String'>
    readonly email: FieldRef<"comuni", 'String'>
    readonly password: FieldRef<"comuni", 'String'>
  }
    

  // Custom InputTypes
  /**
   * comuni findUnique
   */
  export type comuniFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comuni
     */
    select?: comuniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comuni
     */
    omit?: comuniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: comuniInclude<ExtArgs> | null
    /**
     * Filter, which comuni to fetch.
     */
    where: comuniWhereUniqueInput
  }

  /**
   * comuni findUniqueOrThrow
   */
  export type comuniFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comuni
     */
    select?: comuniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comuni
     */
    omit?: comuniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: comuniInclude<ExtArgs> | null
    /**
     * Filter, which comuni to fetch.
     */
    where: comuniWhereUniqueInput
  }

  /**
   * comuni findFirst
   */
  export type comuniFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comuni
     */
    select?: comuniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comuni
     */
    omit?: comuniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: comuniInclude<ExtArgs> | null
    /**
     * Filter, which comuni to fetch.
     */
    where?: comuniWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of comunis to fetch.
     */
    orderBy?: comuniOrderByWithRelationInput | comuniOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for comunis.
     */
    cursor?: comuniWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` comunis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` comunis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of comunis.
     */
    distinct?: ComuniScalarFieldEnum | ComuniScalarFieldEnum[]
  }

  /**
   * comuni findFirstOrThrow
   */
  export type comuniFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comuni
     */
    select?: comuniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comuni
     */
    omit?: comuniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: comuniInclude<ExtArgs> | null
    /**
     * Filter, which comuni to fetch.
     */
    where?: comuniWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of comunis to fetch.
     */
    orderBy?: comuniOrderByWithRelationInput | comuniOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for comunis.
     */
    cursor?: comuniWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` comunis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` comunis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of comunis.
     */
    distinct?: ComuniScalarFieldEnum | ComuniScalarFieldEnum[]
  }

  /**
   * comuni findMany
   */
  export type comuniFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comuni
     */
    select?: comuniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comuni
     */
    omit?: comuniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: comuniInclude<ExtArgs> | null
    /**
     * Filter, which comunis to fetch.
     */
    where?: comuniWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of comunis to fetch.
     */
    orderBy?: comuniOrderByWithRelationInput | comuniOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing comunis.
     */
    cursor?: comuniWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` comunis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` comunis.
     */
    skip?: number
    distinct?: ComuniScalarFieldEnum | ComuniScalarFieldEnum[]
  }

  /**
   * comuni create
   */
  export type comuniCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comuni
     */
    select?: comuniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comuni
     */
    omit?: comuniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: comuniInclude<ExtArgs> | null
    /**
     * The data needed to create a comuni.
     */
    data: XOR<comuniCreateInput, comuniUncheckedCreateInput>
  }

  /**
   * comuni createMany
   */
  export type comuniCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many comunis.
     */
    data: comuniCreateManyInput | comuniCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * comuni createManyAndReturn
   */
  export type comuniCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comuni
     */
    select?: comuniSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the comuni
     */
    omit?: comuniOmit<ExtArgs> | null
    /**
     * The data used to create many comunis.
     */
    data: comuniCreateManyInput | comuniCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * comuni update
   */
  export type comuniUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comuni
     */
    select?: comuniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comuni
     */
    omit?: comuniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: comuniInclude<ExtArgs> | null
    /**
     * The data needed to update a comuni.
     */
    data: XOR<comuniUpdateInput, comuniUncheckedUpdateInput>
    /**
     * Choose, which comuni to update.
     */
    where: comuniWhereUniqueInput
  }

  /**
   * comuni updateMany
   */
  export type comuniUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update comunis.
     */
    data: XOR<comuniUpdateManyMutationInput, comuniUncheckedUpdateManyInput>
    /**
     * Filter which comunis to update
     */
    where?: comuniWhereInput
    /**
     * Limit how many comunis to update.
     */
    limit?: number
  }

  /**
   * comuni updateManyAndReturn
   */
  export type comuniUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comuni
     */
    select?: comuniSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the comuni
     */
    omit?: comuniOmit<ExtArgs> | null
    /**
     * The data used to update comunis.
     */
    data: XOR<comuniUpdateManyMutationInput, comuniUncheckedUpdateManyInput>
    /**
     * Filter which comunis to update
     */
    where?: comuniWhereInput
    /**
     * Limit how many comunis to update.
     */
    limit?: number
  }

  /**
   * comuni upsert
   */
  export type comuniUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comuni
     */
    select?: comuniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comuni
     */
    omit?: comuniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: comuniInclude<ExtArgs> | null
    /**
     * The filter to search for the comuni to update in case it exists.
     */
    where: comuniWhereUniqueInput
    /**
     * In case the comuni found by the `where` argument doesn't exist, create a new comuni with this data.
     */
    create: XOR<comuniCreateInput, comuniUncheckedCreateInput>
    /**
     * In case the comuni was found with the provided `where` argument, update it with this data.
     */
    update: XOR<comuniUpdateInput, comuniUncheckedUpdateInput>
  }

  /**
   * comuni delete
   */
  export type comuniDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comuni
     */
    select?: comuniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comuni
     */
    omit?: comuniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: comuniInclude<ExtArgs> | null
    /**
     * Filter which comuni to delete.
     */
    where: comuniWhereUniqueInput
  }

  /**
   * comuni deleteMany
   */
  export type comuniDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which comunis to delete
     */
    where?: comuniWhereInput
    /**
     * Limit how many comunis to delete.
     */
    limit?: number
  }

  /**
   * comuni.area
   */
  export type comuni$areaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the area
     */
    select?: areaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the area
     */
    omit?: areaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: areaInclude<ExtArgs> | null
    where?: areaWhereInput
    orderBy?: areaOrderByWithRelationInput | areaOrderByWithRelationInput[]
    cursor?: areaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AreaScalarFieldEnum | AreaScalarFieldEnum[]
  }

  /**
   * comuni without action
   */
  export type comuniDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comuni
     */
    select?: comuniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comuni
     */
    omit?: comuniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: comuniInclude<ExtArgs> | null
  }


  /**
   * Model ecoscores
   */

  export type AggregateEcoscores = {
    _count: EcoscoresCountAggregateOutputType | null
    _avg: EcoscoresAvgAggregateOutputType | null
    _sum: EcoscoresSumAggregateOutputType | null
    _min: EcoscoresMinAggregateOutputType | null
    _max: EcoscoresMaxAggregateOutputType | null
  }

  export type EcoscoresAvgAggregateOutputType = {
    id: number | null
    punteggio: number | null
    id_area: number | null
    id_sessione: number | null
  }

  export type EcoscoresSumAggregateOutputType = {
    id: number | null
    punteggio: number | null
    id_area: number | null
    id_sessione: number | null
  }

  export type EcoscoresMinAggregateOutputType = {
    id: number | null
    punteggio: number | null
    id_area: number | null
    id_sessione: number | null
  }

  export type EcoscoresMaxAggregateOutputType = {
    id: number | null
    punteggio: number | null
    id_area: number | null
    id_sessione: number | null
  }

  export type EcoscoresCountAggregateOutputType = {
    id: number
    punteggio: number
    id_area: number
    id_sessione: number
    _all: number
  }


  export type EcoscoresAvgAggregateInputType = {
    id?: true
    punteggio?: true
    id_area?: true
    id_sessione?: true
  }

  export type EcoscoresSumAggregateInputType = {
    id?: true
    punteggio?: true
    id_area?: true
    id_sessione?: true
  }

  export type EcoscoresMinAggregateInputType = {
    id?: true
    punteggio?: true
    id_area?: true
    id_sessione?: true
  }

  export type EcoscoresMaxAggregateInputType = {
    id?: true
    punteggio?: true
    id_area?: true
    id_sessione?: true
  }

  export type EcoscoresCountAggregateInputType = {
    id?: true
    punteggio?: true
    id_area?: true
    id_sessione?: true
    _all?: true
  }

  export type EcoscoresAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ecoscores to aggregate.
     */
    where?: ecoscoresWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ecoscores to fetch.
     */
    orderBy?: ecoscoresOrderByWithRelationInput | ecoscoresOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ecoscoresWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ecoscores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ecoscores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ecoscores
    **/
    _count?: true | EcoscoresCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EcoscoresAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EcoscoresSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EcoscoresMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EcoscoresMaxAggregateInputType
  }

  export type GetEcoscoresAggregateType<T extends EcoscoresAggregateArgs> = {
        [P in keyof T & keyof AggregateEcoscores]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEcoscores[P]>
      : GetScalarType<T[P], AggregateEcoscores[P]>
  }




  export type ecoscoresGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ecoscoresWhereInput
    orderBy?: ecoscoresOrderByWithAggregationInput | ecoscoresOrderByWithAggregationInput[]
    by: EcoscoresScalarFieldEnum[] | EcoscoresScalarFieldEnum
    having?: ecoscoresScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EcoscoresCountAggregateInputType | true
    _avg?: EcoscoresAvgAggregateInputType
    _sum?: EcoscoresSumAggregateInputType
    _min?: EcoscoresMinAggregateInputType
    _max?: EcoscoresMaxAggregateInputType
  }

  export type EcoscoresGroupByOutputType = {
    id: number
    punteggio: number | null
    id_area: number
    id_sessione: number
    _count: EcoscoresCountAggregateOutputType | null
    _avg: EcoscoresAvgAggregateOutputType | null
    _sum: EcoscoresSumAggregateOutputType | null
    _min: EcoscoresMinAggregateOutputType | null
    _max: EcoscoresMaxAggregateOutputType | null
  }

  type GetEcoscoresGroupByPayload<T extends ecoscoresGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EcoscoresGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EcoscoresGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EcoscoresGroupByOutputType[P]>
            : GetScalarType<T[P], EcoscoresGroupByOutputType[P]>
        }
      >
    >


  export type ecoscoresSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    punteggio?: boolean
    id_area?: boolean
    id_sessione?: boolean
    area?: boolean | areaDefaultArgs<ExtArgs>
    sessioni?: boolean | sessioniDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ecoscores"]>

  export type ecoscoresSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    punteggio?: boolean
    id_area?: boolean
    id_sessione?: boolean
    area?: boolean | areaDefaultArgs<ExtArgs>
    sessioni?: boolean | sessioniDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ecoscores"]>

  export type ecoscoresSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    punteggio?: boolean
    id_area?: boolean
    id_sessione?: boolean
    area?: boolean | areaDefaultArgs<ExtArgs>
    sessioni?: boolean | sessioniDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ecoscores"]>

  export type ecoscoresSelectScalar = {
    id?: boolean
    punteggio?: boolean
    id_area?: boolean
    id_sessione?: boolean
  }

  export type ecoscoresOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "punteggio" | "id_area" | "id_sessione", ExtArgs["result"]["ecoscores"]>
  export type ecoscoresInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    area?: boolean | areaDefaultArgs<ExtArgs>
    sessioni?: boolean | sessioniDefaultArgs<ExtArgs>
  }
  export type ecoscoresIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    area?: boolean | areaDefaultArgs<ExtArgs>
    sessioni?: boolean | sessioniDefaultArgs<ExtArgs>
  }
  export type ecoscoresIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    area?: boolean | areaDefaultArgs<ExtArgs>
    sessioni?: boolean | sessioniDefaultArgs<ExtArgs>
  }

  export type $ecoscoresPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ecoscores"
    objects: {
      area: Prisma.$areaPayload<ExtArgs>
      sessioni: Prisma.$sessioniPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      punteggio: number | null
      id_area: number
      id_sessione: number
    }, ExtArgs["result"]["ecoscores"]>
    composites: {}
  }

  type ecoscoresGetPayload<S extends boolean | null | undefined | ecoscoresDefaultArgs> = $Result.GetResult<Prisma.$ecoscoresPayload, S>

  type ecoscoresCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ecoscoresFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EcoscoresCountAggregateInputType | true
    }

  export interface ecoscoresDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ecoscores'], meta: { name: 'ecoscores' } }
    /**
     * Find zero or one Ecoscores that matches the filter.
     * @param {ecoscoresFindUniqueArgs} args - Arguments to find a Ecoscores
     * @example
     * // Get one Ecoscores
     * const ecoscores = await prisma.ecoscores.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ecoscoresFindUniqueArgs>(args: SelectSubset<T, ecoscoresFindUniqueArgs<ExtArgs>>): Prisma__ecoscoresClient<$Result.GetResult<Prisma.$ecoscoresPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ecoscores that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ecoscoresFindUniqueOrThrowArgs} args - Arguments to find a Ecoscores
     * @example
     * // Get one Ecoscores
     * const ecoscores = await prisma.ecoscores.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ecoscoresFindUniqueOrThrowArgs>(args: SelectSubset<T, ecoscoresFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ecoscoresClient<$Result.GetResult<Prisma.$ecoscoresPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ecoscores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ecoscoresFindFirstArgs} args - Arguments to find a Ecoscores
     * @example
     * // Get one Ecoscores
     * const ecoscores = await prisma.ecoscores.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ecoscoresFindFirstArgs>(args?: SelectSubset<T, ecoscoresFindFirstArgs<ExtArgs>>): Prisma__ecoscoresClient<$Result.GetResult<Prisma.$ecoscoresPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ecoscores that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ecoscoresFindFirstOrThrowArgs} args - Arguments to find a Ecoscores
     * @example
     * // Get one Ecoscores
     * const ecoscores = await prisma.ecoscores.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ecoscoresFindFirstOrThrowArgs>(args?: SelectSubset<T, ecoscoresFindFirstOrThrowArgs<ExtArgs>>): Prisma__ecoscoresClient<$Result.GetResult<Prisma.$ecoscoresPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ecoscores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ecoscoresFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ecoscores
     * const ecoscores = await prisma.ecoscores.findMany()
     * 
     * // Get first 10 Ecoscores
     * const ecoscores = await prisma.ecoscores.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ecoscoresWithIdOnly = await prisma.ecoscores.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ecoscoresFindManyArgs>(args?: SelectSubset<T, ecoscoresFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ecoscoresPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ecoscores.
     * @param {ecoscoresCreateArgs} args - Arguments to create a Ecoscores.
     * @example
     * // Create one Ecoscores
     * const Ecoscores = await prisma.ecoscores.create({
     *   data: {
     *     // ... data to create a Ecoscores
     *   }
     * })
     * 
     */
    create<T extends ecoscoresCreateArgs>(args: SelectSubset<T, ecoscoresCreateArgs<ExtArgs>>): Prisma__ecoscoresClient<$Result.GetResult<Prisma.$ecoscoresPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ecoscores.
     * @param {ecoscoresCreateManyArgs} args - Arguments to create many Ecoscores.
     * @example
     * // Create many Ecoscores
     * const ecoscores = await prisma.ecoscores.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ecoscoresCreateManyArgs>(args?: SelectSubset<T, ecoscoresCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ecoscores and returns the data saved in the database.
     * @param {ecoscoresCreateManyAndReturnArgs} args - Arguments to create many Ecoscores.
     * @example
     * // Create many Ecoscores
     * const ecoscores = await prisma.ecoscores.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ecoscores and only return the `id`
     * const ecoscoresWithIdOnly = await prisma.ecoscores.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ecoscoresCreateManyAndReturnArgs>(args?: SelectSubset<T, ecoscoresCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ecoscoresPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ecoscores.
     * @param {ecoscoresDeleteArgs} args - Arguments to delete one Ecoscores.
     * @example
     * // Delete one Ecoscores
     * const Ecoscores = await prisma.ecoscores.delete({
     *   where: {
     *     // ... filter to delete one Ecoscores
     *   }
     * })
     * 
     */
    delete<T extends ecoscoresDeleteArgs>(args: SelectSubset<T, ecoscoresDeleteArgs<ExtArgs>>): Prisma__ecoscoresClient<$Result.GetResult<Prisma.$ecoscoresPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ecoscores.
     * @param {ecoscoresUpdateArgs} args - Arguments to update one Ecoscores.
     * @example
     * // Update one Ecoscores
     * const ecoscores = await prisma.ecoscores.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ecoscoresUpdateArgs>(args: SelectSubset<T, ecoscoresUpdateArgs<ExtArgs>>): Prisma__ecoscoresClient<$Result.GetResult<Prisma.$ecoscoresPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ecoscores.
     * @param {ecoscoresDeleteManyArgs} args - Arguments to filter Ecoscores to delete.
     * @example
     * // Delete a few Ecoscores
     * const { count } = await prisma.ecoscores.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ecoscoresDeleteManyArgs>(args?: SelectSubset<T, ecoscoresDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ecoscores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ecoscoresUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ecoscores
     * const ecoscores = await prisma.ecoscores.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ecoscoresUpdateManyArgs>(args: SelectSubset<T, ecoscoresUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ecoscores and returns the data updated in the database.
     * @param {ecoscoresUpdateManyAndReturnArgs} args - Arguments to update many Ecoscores.
     * @example
     * // Update many Ecoscores
     * const ecoscores = await prisma.ecoscores.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Ecoscores and only return the `id`
     * const ecoscoresWithIdOnly = await prisma.ecoscores.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ecoscoresUpdateManyAndReturnArgs>(args: SelectSubset<T, ecoscoresUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ecoscoresPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ecoscores.
     * @param {ecoscoresUpsertArgs} args - Arguments to update or create a Ecoscores.
     * @example
     * // Update or create a Ecoscores
     * const ecoscores = await prisma.ecoscores.upsert({
     *   create: {
     *     // ... data to create a Ecoscores
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ecoscores we want to update
     *   }
     * })
     */
    upsert<T extends ecoscoresUpsertArgs>(args: SelectSubset<T, ecoscoresUpsertArgs<ExtArgs>>): Prisma__ecoscoresClient<$Result.GetResult<Prisma.$ecoscoresPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ecoscores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ecoscoresCountArgs} args - Arguments to filter Ecoscores to count.
     * @example
     * // Count the number of Ecoscores
     * const count = await prisma.ecoscores.count({
     *   where: {
     *     // ... the filter for the Ecoscores we want to count
     *   }
     * })
    **/
    count<T extends ecoscoresCountArgs>(
      args?: Subset<T, ecoscoresCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EcoscoresCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ecoscores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EcoscoresAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EcoscoresAggregateArgs>(args: Subset<T, EcoscoresAggregateArgs>): Prisma.PrismaPromise<GetEcoscoresAggregateType<T>>

    /**
     * Group by Ecoscores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ecoscoresGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ecoscoresGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ecoscoresGroupByArgs['orderBy'] }
        : { orderBy?: ecoscoresGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ecoscoresGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEcoscoresGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ecoscores model
   */
  readonly fields: ecoscoresFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ecoscores.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ecoscoresClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    area<T extends areaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, areaDefaultArgs<ExtArgs>>): Prisma__areaClient<$Result.GetResult<Prisma.$areaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sessioni<T extends sessioniDefaultArgs<ExtArgs> = {}>(args?: Subset<T, sessioniDefaultArgs<ExtArgs>>): Prisma__sessioniClient<$Result.GetResult<Prisma.$sessioniPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ecoscores model
   */
  interface ecoscoresFieldRefs {
    readonly id: FieldRef<"ecoscores", 'Int'>
    readonly punteggio: FieldRef<"ecoscores", 'Float'>
    readonly id_area: FieldRef<"ecoscores", 'Int'>
    readonly id_sessione: FieldRef<"ecoscores", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ecoscores findUnique
   */
  export type ecoscoresFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ecoscores
     */
    select?: ecoscoresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ecoscores
     */
    omit?: ecoscoresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ecoscoresInclude<ExtArgs> | null
    /**
     * Filter, which ecoscores to fetch.
     */
    where: ecoscoresWhereUniqueInput
  }

  /**
   * ecoscores findUniqueOrThrow
   */
  export type ecoscoresFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ecoscores
     */
    select?: ecoscoresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ecoscores
     */
    omit?: ecoscoresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ecoscoresInclude<ExtArgs> | null
    /**
     * Filter, which ecoscores to fetch.
     */
    where: ecoscoresWhereUniqueInput
  }

  /**
   * ecoscores findFirst
   */
  export type ecoscoresFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ecoscores
     */
    select?: ecoscoresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ecoscores
     */
    omit?: ecoscoresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ecoscoresInclude<ExtArgs> | null
    /**
     * Filter, which ecoscores to fetch.
     */
    where?: ecoscoresWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ecoscores to fetch.
     */
    orderBy?: ecoscoresOrderByWithRelationInput | ecoscoresOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ecoscores.
     */
    cursor?: ecoscoresWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ecoscores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ecoscores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ecoscores.
     */
    distinct?: EcoscoresScalarFieldEnum | EcoscoresScalarFieldEnum[]
  }

  /**
   * ecoscores findFirstOrThrow
   */
  export type ecoscoresFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ecoscores
     */
    select?: ecoscoresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ecoscores
     */
    omit?: ecoscoresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ecoscoresInclude<ExtArgs> | null
    /**
     * Filter, which ecoscores to fetch.
     */
    where?: ecoscoresWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ecoscores to fetch.
     */
    orderBy?: ecoscoresOrderByWithRelationInput | ecoscoresOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ecoscores.
     */
    cursor?: ecoscoresWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ecoscores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ecoscores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ecoscores.
     */
    distinct?: EcoscoresScalarFieldEnum | EcoscoresScalarFieldEnum[]
  }

  /**
   * ecoscores findMany
   */
  export type ecoscoresFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ecoscores
     */
    select?: ecoscoresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ecoscores
     */
    omit?: ecoscoresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ecoscoresInclude<ExtArgs> | null
    /**
     * Filter, which ecoscores to fetch.
     */
    where?: ecoscoresWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ecoscores to fetch.
     */
    orderBy?: ecoscoresOrderByWithRelationInput | ecoscoresOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ecoscores.
     */
    cursor?: ecoscoresWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ecoscores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ecoscores.
     */
    skip?: number
    distinct?: EcoscoresScalarFieldEnum | EcoscoresScalarFieldEnum[]
  }

  /**
   * ecoscores create
   */
  export type ecoscoresCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ecoscores
     */
    select?: ecoscoresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ecoscores
     */
    omit?: ecoscoresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ecoscoresInclude<ExtArgs> | null
    /**
     * The data needed to create a ecoscores.
     */
    data: XOR<ecoscoresCreateInput, ecoscoresUncheckedCreateInput>
  }

  /**
   * ecoscores createMany
   */
  export type ecoscoresCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ecoscores.
     */
    data: ecoscoresCreateManyInput | ecoscoresCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ecoscores createManyAndReturn
   */
  export type ecoscoresCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ecoscores
     */
    select?: ecoscoresSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ecoscores
     */
    omit?: ecoscoresOmit<ExtArgs> | null
    /**
     * The data used to create many ecoscores.
     */
    data: ecoscoresCreateManyInput | ecoscoresCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ecoscoresIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ecoscores update
   */
  export type ecoscoresUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ecoscores
     */
    select?: ecoscoresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ecoscores
     */
    omit?: ecoscoresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ecoscoresInclude<ExtArgs> | null
    /**
     * The data needed to update a ecoscores.
     */
    data: XOR<ecoscoresUpdateInput, ecoscoresUncheckedUpdateInput>
    /**
     * Choose, which ecoscores to update.
     */
    where: ecoscoresWhereUniqueInput
  }

  /**
   * ecoscores updateMany
   */
  export type ecoscoresUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ecoscores.
     */
    data: XOR<ecoscoresUpdateManyMutationInput, ecoscoresUncheckedUpdateManyInput>
    /**
     * Filter which ecoscores to update
     */
    where?: ecoscoresWhereInput
    /**
     * Limit how many ecoscores to update.
     */
    limit?: number
  }

  /**
   * ecoscores updateManyAndReturn
   */
  export type ecoscoresUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ecoscores
     */
    select?: ecoscoresSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ecoscores
     */
    omit?: ecoscoresOmit<ExtArgs> | null
    /**
     * The data used to update ecoscores.
     */
    data: XOR<ecoscoresUpdateManyMutationInput, ecoscoresUncheckedUpdateManyInput>
    /**
     * Filter which ecoscores to update
     */
    where?: ecoscoresWhereInput
    /**
     * Limit how many ecoscores to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ecoscoresIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ecoscores upsert
   */
  export type ecoscoresUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ecoscores
     */
    select?: ecoscoresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ecoscores
     */
    omit?: ecoscoresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ecoscoresInclude<ExtArgs> | null
    /**
     * The filter to search for the ecoscores to update in case it exists.
     */
    where: ecoscoresWhereUniqueInput
    /**
     * In case the ecoscores found by the `where` argument doesn't exist, create a new ecoscores with this data.
     */
    create: XOR<ecoscoresCreateInput, ecoscoresUncheckedCreateInput>
    /**
     * In case the ecoscores was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ecoscoresUpdateInput, ecoscoresUncheckedUpdateInput>
  }

  /**
   * ecoscores delete
   */
  export type ecoscoresDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ecoscores
     */
    select?: ecoscoresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ecoscores
     */
    omit?: ecoscoresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ecoscoresInclude<ExtArgs> | null
    /**
     * Filter which ecoscores to delete.
     */
    where: ecoscoresWhereUniqueInput
  }

  /**
   * ecoscores deleteMany
   */
  export type ecoscoresDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ecoscores to delete
     */
    where?: ecoscoresWhereInput
    /**
     * Limit how many ecoscores to delete.
     */
    limit?: number
  }

  /**
   * ecoscores without action
   */
  export type ecoscoresDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ecoscores
     */
    select?: ecoscoresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ecoscores
     */
    omit?: ecoscoresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ecoscoresInclude<ExtArgs> | null
  }


  /**
   * Model propriet_
   */

  export type AggregatePropriet_ = {
    _count: Propriet_CountAggregateOutputType | null
    _avg: Propriet_AvgAggregateOutputType | null
    _sum: Propriet_SumAggregateOutputType | null
    _min: Propriet_MinAggregateOutputType | null
    _max: Propriet_MaxAggregateOutputType | null
  }

  export type Propriet_AvgAggregateOutputType = {
    id: number | null
    id_cittadino: number | null
    id_vettura: number | null
  }

  export type Propriet_SumAggregateOutputType = {
    id: number | null
    id_cittadino: number | null
    id_vettura: number | null
  }

  export type Propriet_MinAggregateOutputType = {
    id: number | null
    id_cittadino: number | null
    id_vettura: number | null
  }

  export type Propriet_MaxAggregateOutputType = {
    id: number | null
    id_cittadino: number | null
    id_vettura: number | null
  }

  export type Propriet_CountAggregateOutputType = {
    id: number
    id_cittadino: number
    id_vettura: number
    _all: number
  }


  export type Propriet_AvgAggregateInputType = {
    id?: true
    id_cittadino?: true
    id_vettura?: true
  }

  export type Propriet_SumAggregateInputType = {
    id?: true
    id_cittadino?: true
    id_vettura?: true
  }

  export type Propriet_MinAggregateInputType = {
    id?: true
    id_cittadino?: true
    id_vettura?: true
  }

  export type Propriet_MaxAggregateInputType = {
    id?: true
    id_cittadino?: true
    id_vettura?: true
  }

  export type Propriet_CountAggregateInputType = {
    id?: true
    id_cittadino?: true
    id_vettura?: true
    _all?: true
  }

  export type Propriet_AggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which propriet_ to aggregate.
     */
    where?: propriet_WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of propriet_s to fetch.
     */
    orderBy?: propriet_OrderByWithRelationInput | propriet_OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: propriet_WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` propriet_s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` propriet_s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned propriet_s
    **/
    _count?: true | Propriet_CountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Propriet_AvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Propriet_SumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Propriet_MinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Propriet_MaxAggregateInputType
  }

  export type GetPropriet_AggregateType<T extends Propriet_AggregateArgs> = {
        [P in keyof T & keyof AggregatePropriet_]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePropriet_[P]>
      : GetScalarType<T[P], AggregatePropriet_[P]>
  }




  export type propriet_GroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: propriet_WhereInput
    orderBy?: propriet_OrderByWithAggregationInput | propriet_OrderByWithAggregationInput[]
    by: Propriet_ScalarFieldEnum[] | Propriet_ScalarFieldEnum
    having?: propriet_ScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Propriet_CountAggregateInputType | true
    _avg?: Propriet_AvgAggregateInputType
    _sum?: Propriet_SumAggregateInputType
    _min?: Propriet_MinAggregateInputType
    _max?: Propriet_MaxAggregateInputType
  }

  export type Propriet_GroupByOutputType = {
    id: number
    id_cittadino: number
    id_vettura: number
    _count: Propriet_CountAggregateOutputType | null
    _avg: Propriet_AvgAggregateOutputType | null
    _sum: Propriet_SumAggregateOutputType | null
    _min: Propriet_MinAggregateOutputType | null
    _max: Propriet_MaxAggregateOutputType | null
  }

  type GetPropriet_GroupByPayload<T extends propriet_GroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Propriet_GroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Propriet_GroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Propriet_GroupByOutputType[P]>
            : GetScalarType<T[P], Propriet_GroupByOutputType[P]>
        }
      >
    >


  export type propriet_Select<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_cittadino?: boolean
    id_vettura?: boolean
    cittadini?: boolean | cittadiniDefaultArgs<ExtArgs>
    vetture?: boolean | vettureDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propriet_"]>

  export type propriet_SelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_cittadino?: boolean
    id_vettura?: boolean
    cittadini?: boolean | cittadiniDefaultArgs<ExtArgs>
    vetture?: boolean | vettureDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propriet_"]>

  export type propriet_SelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_cittadino?: boolean
    id_vettura?: boolean
    cittadini?: boolean | cittadiniDefaultArgs<ExtArgs>
    vetture?: boolean | vettureDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propriet_"]>

  export type propriet_SelectScalar = {
    id?: boolean
    id_cittadino?: boolean
    id_vettura?: boolean
  }

  export type propriet_Omit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "id_cittadino" | "id_vettura", ExtArgs["result"]["propriet_"]>
  export type propriet_Include<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cittadini?: boolean | cittadiniDefaultArgs<ExtArgs>
    vetture?: boolean | vettureDefaultArgs<ExtArgs>
  }
  export type propriet_IncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cittadini?: boolean | cittadiniDefaultArgs<ExtArgs>
    vetture?: boolean | vettureDefaultArgs<ExtArgs>
  }
  export type propriet_IncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cittadini?: boolean | cittadiniDefaultArgs<ExtArgs>
    vetture?: boolean | vettureDefaultArgs<ExtArgs>
  }

  export type $propriet_Payload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "propriet_"
    objects: {
      cittadini: Prisma.$cittadiniPayload<ExtArgs>
      vetture: Prisma.$vetturePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      id_cittadino: number
      id_vettura: number
    }, ExtArgs["result"]["propriet_"]>
    composites: {}
  }

  type propriet_GetPayload<S extends boolean | null | undefined | propriet_DefaultArgs> = $Result.GetResult<Prisma.$propriet_Payload, S>

  type propriet_CountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<propriet_FindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Propriet_CountAggregateInputType | true
    }

  export interface propriet_Delegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['propriet_'], meta: { name: 'propriet_' } }
    /**
     * Find zero or one Propriet_ that matches the filter.
     * @param {propriet_FindUniqueArgs} args - Arguments to find a Propriet_
     * @example
     * // Get one Propriet_
     * const propriet_ = await prisma.propriet_.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends propriet_FindUniqueArgs>(args: SelectSubset<T, propriet_FindUniqueArgs<ExtArgs>>): Prisma__propriet_Client<$Result.GetResult<Prisma.$propriet_Payload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Propriet_ that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {propriet_FindUniqueOrThrowArgs} args - Arguments to find a Propriet_
     * @example
     * // Get one Propriet_
     * const propriet_ = await prisma.propriet_.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends propriet_FindUniqueOrThrowArgs>(args: SelectSubset<T, propriet_FindUniqueOrThrowArgs<ExtArgs>>): Prisma__propriet_Client<$Result.GetResult<Prisma.$propriet_Payload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Propriet_ that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {propriet_FindFirstArgs} args - Arguments to find a Propriet_
     * @example
     * // Get one Propriet_
     * const propriet_ = await prisma.propriet_.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends propriet_FindFirstArgs>(args?: SelectSubset<T, propriet_FindFirstArgs<ExtArgs>>): Prisma__propriet_Client<$Result.GetResult<Prisma.$propriet_Payload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Propriet_ that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {propriet_FindFirstOrThrowArgs} args - Arguments to find a Propriet_
     * @example
     * // Get one Propriet_
     * const propriet_ = await prisma.propriet_.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends propriet_FindFirstOrThrowArgs>(args?: SelectSubset<T, propriet_FindFirstOrThrowArgs<ExtArgs>>): Prisma__propriet_Client<$Result.GetResult<Prisma.$propriet_Payload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Propriet_s that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {propriet_FindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Propriet_s
     * const propriet_s = await prisma.propriet_.findMany()
     * 
     * // Get first 10 Propriet_s
     * const propriet_s = await prisma.propriet_.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propriet_WithIdOnly = await prisma.propriet_.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends propriet_FindManyArgs>(args?: SelectSubset<T, propriet_FindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$propriet_Payload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Propriet_.
     * @param {propriet_CreateArgs} args - Arguments to create a Propriet_.
     * @example
     * // Create one Propriet_
     * const Propriet_ = await prisma.propriet_.create({
     *   data: {
     *     // ... data to create a Propriet_
     *   }
     * })
     * 
     */
    create<T extends propriet_CreateArgs>(args: SelectSubset<T, propriet_CreateArgs<ExtArgs>>): Prisma__propriet_Client<$Result.GetResult<Prisma.$propriet_Payload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Propriet_s.
     * @param {propriet_CreateManyArgs} args - Arguments to create many Propriet_s.
     * @example
     * // Create many Propriet_s
     * const propriet_ = await prisma.propriet_.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends propriet_CreateManyArgs>(args?: SelectSubset<T, propriet_CreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Propriet_s and returns the data saved in the database.
     * @param {propriet_CreateManyAndReturnArgs} args - Arguments to create many Propriet_s.
     * @example
     * // Create many Propriet_s
     * const propriet_ = await prisma.propriet_.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Propriet_s and only return the `id`
     * const propriet_WithIdOnly = await prisma.propriet_.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends propriet_CreateManyAndReturnArgs>(args?: SelectSubset<T, propriet_CreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$propriet_Payload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Propriet_.
     * @param {propriet_DeleteArgs} args - Arguments to delete one Propriet_.
     * @example
     * // Delete one Propriet_
     * const Propriet_ = await prisma.propriet_.delete({
     *   where: {
     *     // ... filter to delete one Propriet_
     *   }
     * })
     * 
     */
    delete<T extends propriet_DeleteArgs>(args: SelectSubset<T, propriet_DeleteArgs<ExtArgs>>): Prisma__propriet_Client<$Result.GetResult<Prisma.$propriet_Payload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Propriet_.
     * @param {propriet_UpdateArgs} args - Arguments to update one Propriet_.
     * @example
     * // Update one Propriet_
     * const propriet_ = await prisma.propriet_.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends propriet_UpdateArgs>(args: SelectSubset<T, propriet_UpdateArgs<ExtArgs>>): Prisma__propriet_Client<$Result.GetResult<Prisma.$propriet_Payload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Propriet_s.
     * @param {propriet_DeleteManyArgs} args - Arguments to filter Propriet_s to delete.
     * @example
     * // Delete a few Propriet_s
     * const { count } = await prisma.propriet_.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends propriet_DeleteManyArgs>(args?: SelectSubset<T, propriet_DeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Propriet_s.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {propriet_UpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Propriet_s
     * const propriet_ = await prisma.propriet_.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends propriet_UpdateManyArgs>(args: SelectSubset<T, propriet_UpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Propriet_s and returns the data updated in the database.
     * @param {propriet_UpdateManyAndReturnArgs} args - Arguments to update many Propriet_s.
     * @example
     * // Update many Propriet_s
     * const propriet_ = await prisma.propriet_.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Propriet_s and only return the `id`
     * const propriet_WithIdOnly = await prisma.propriet_.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends propriet_UpdateManyAndReturnArgs>(args: SelectSubset<T, propriet_UpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$propriet_Payload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Propriet_.
     * @param {propriet_UpsertArgs} args - Arguments to update or create a Propriet_.
     * @example
     * // Update or create a Propriet_
     * const propriet_ = await prisma.propriet_.upsert({
     *   create: {
     *     // ... data to create a Propriet_
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Propriet_ we want to update
     *   }
     * })
     */
    upsert<T extends propriet_UpsertArgs>(args: SelectSubset<T, propriet_UpsertArgs<ExtArgs>>): Prisma__propriet_Client<$Result.GetResult<Prisma.$propriet_Payload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Propriet_s.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {propriet_CountArgs} args - Arguments to filter Propriet_s to count.
     * @example
     * // Count the number of Propriet_s
     * const count = await prisma.propriet_.count({
     *   where: {
     *     // ... the filter for the Propriet_s we want to count
     *   }
     * })
    **/
    count<T extends propriet_CountArgs>(
      args?: Subset<T, propriet_CountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Propriet_CountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Propriet_.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Propriet_AggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Propriet_AggregateArgs>(args: Subset<T, Propriet_AggregateArgs>): Prisma.PrismaPromise<GetPropriet_AggregateType<T>>

    /**
     * Group by Propriet_.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {propriet_GroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends propriet_GroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: propriet_GroupByArgs['orderBy'] }
        : { orderBy?: propriet_GroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, propriet_GroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropriet_GroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the propriet_ model
   */
  readonly fields: propriet_FieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for propriet_.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__propriet_Client<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cittadini<T extends cittadiniDefaultArgs<ExtArgs> = {}>(args?: Subset<T, cittadiniDefaultArgs<ExtArgs>>): Prisma__cittadiniClient<$Result.GetResult<Prisma.$cittadiniPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    vetture<T extends vettureDefaultArgs<ExtArgs> = {}>(args?: Subset<T, vettureDefaultArgs<ExtArgs>>): Prisma__vettureClient<$Result.GetResult<Prisma.$vetturePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the propriet_ model
   */
  interface propriet_FieldRefs {
    readonly id: FieldRef<"propriet_", 'Int'>
    readonly id_cittadino: FieldRef<"propriet_", 'Int'>
    readonly id_vettura: FieldRef<"propriet_", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * propriet_ findUnique
   */
  export type propriet_FindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propriet_
     */
    select?: propriet_Select<ExtArgs> | null
    /**
     * Omit specific fields from the propriet_
     */
    omit?: propriet_Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propriet_Include<ExtArgs> | null
    /**
     * Filter, which propriet_ to fetch.
     */
    where: propriet_WhereUniqueInput
  }

  /**
   * propriet_ findUniqueOrThrow
   */
  export type propriet_FindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propriet_
     */
    select?: propriet_Select<ExtArgs> | null
    /**
     * Omit specific fields from the propriet_
     */
    omit?: propriet_Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propriet_Include<ExtArgs> | null
    /**
     * Filter, which propriet_ to fetch.
     */
    where: propriet_WhereUniqueInput
  }

  /**
   * propriet_ findFirst
   */
  export type propriet_FindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propriet_
     */
    select?: propriet_Select<ExtArgs> | null
    /**
     * Omit specific fields from the propriet_
     */
    omit?: propriet_Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propriet_Include<ExtArgs> | null
    /**
     * Filter, which propriet_ to fetch.
     */
    where?: propriet_WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of propriet_s to fetch.
     */
    orderBy?: propriet_OrderByWithRelationInput | propriet_OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for propriet_s.
     */
    cursor?: propriet_WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` propriet_s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` propriet_s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of propriet_s.
     */
    distinct?: Propriet_ScalarFieldEnum | Propriet_ScalarFieldEnum[]
  }

  /**
   * propriet_ findFirstOrThrow
   */
  export type propriet_FindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propriet_
     */
    select?: propriet_Select<ExtArgs> | null
    /**
     * Omit specific fields from the propriet_
     */
    omit?: propriet_Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propriet_Include<ExtArgs> | null
    /**
     * Filter, which propriet_ to fetch.
     */
    where?: propriet_WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of propriet_s to fetch.
     */
    orderBy?: propriet_OrderByWithRelationInput | propriet_OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for propriet_s.
     */
    cursor?: propriet_WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` propriet_s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` propriet_s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of propriet_s.
     */
    distinct?: Propriet_ScalarFieldEnum | Propriet_ScalarFieldEnum[]
  }

  /**
   * propriet_ findMany
   */
  export type propriet_FindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propriet_
     */
    select?: propriet_Select<ExtArgs> | null
    /**
     * Omit specific fields from the propriet_
     */
    omit?: propriet_Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propriet_Include<ExtArgs> | null
    /**
     * Filter, which propriet_s to fetch.
     */
    where?: propriet_WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of propriet_s to fetch.
     */
    orderBy?: propriet_OrderByWithRelationInput | propriet_OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing propriet_s.
     */
    cursor?: propriet_WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` propriet_s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` propriet_s.
     */
    skip?: number
    distinct?: Propriet_ScalarFieldEnum | Propriet_ScalarFieldEnum[]
  }

  /**
   * propriet_ create
   */
  export type propriet_CreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propriet_
     */
    select?: propriet_Select<ExtArgs> | null
    /**
     * Omit specific fields from the propriet_
     */
    omit?: propriet_Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propriet_Include<ExtArgs> | null
    /**
     * The data needed to create a propriet_.
     */
    data: XOR<propriet_CreateInput, propriet_UncheckedCreateInput>
  }

  /**
   * propriet_ createMany
   */
  export type propriet_CreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many propriet_s.
     */
    data: propriet_CreateManyInput | propriet_CreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * propriet_ createManyAndReturn
   */
  export type propriet_CreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propriet_
     */
    select?: propriet_SelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the propriet_
     */
    omit?: propriet_Omit<ExtArgs> | null
    /**
     * The data used to create many propriet_s.
     */
    data: propriet_CreateManyInput | propriet_CreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propriet_IncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * propriet_ update
   */
  export type propriet_UpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propriet_
     */
    select?: propriet_Select<ExtArgs> | null
    /**
     * Omit specific fields from the propriet_
     */
    omit?: propriet_Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propriet_Include<ExtArgs> | null
    /**
     * The data needed to update a propriet_.
     */
    data: XOR<propriet_UpdateInput, propriet_UncheckedUpdateInput>
    /**
     * Choose, which propriet_ to update.
     */
    where: propriet_WhereUniqueInput
  }

  /**
   * propriet_ updateMany
   */
  export type propriet_UpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update propriet_s.
     */
    data: XOR<propriet_UpdateManyMutationInput, propriet_UncheckedUpdateManyInput>
    /**
     * Filter which propriet_s to update
     */
    where?: propriet_WhereInput
    /**
     * Limit how many propriet_s to update.
     */
    limit?: number
  }

  /**
   * propriet_ updateManyAndReturn
   */
  export type propriet_UpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propriet_
     */
    select?: propriet_SelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the propriet_
     */
    omit?: propriet_Omit<ExtArgs> | null
    /**
     * The data used to update propriet_s.
     */
    data: XOR<propriet_UpdateManyMutationInput, propriet_UncheckedUpdateManyInput>
    /**
     * Filter which propriet_s to update
     */
    where?: propriet_WhereInput
    /**
     * Limit how many propriet_s to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propriet_IncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * propriet_ upsert
   */
  export type propriet_UpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propriet_
     */
    select?: propriet_Select<ExtArgs> | null
    /**
     * Omit specific fields from the propriet_
     */
    omit?: propriet_Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propriet_Include<ExtArgs> | null
    /**
     * The filter to search for the propriet_ to update in case it exists.
     */
    where: propriet_WhereUniqueInput
    /**
     * In case the propriet_ found by the `where` argument doesn't exist, create a new propriet_ with this data.
     */
    create: XOR<propriet_CreateInput, propriet_UncheckedCreateInput>
    /**
     * In case the propriet_ was found with the provided `where` argument, update it with this data.
     */
    update: XOR<propriet_UpdateInput, propriet_UncheckedUpdateInput>
  }

  /**
   * propriet_ delete
   */
  export type propriet_DeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propriet_
     */
    select?: propriet_Select<ExtArgs> | null
    /**
     * Omit specific fields from the propriet_
     */
    omit?: propriet_Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propriet_Include<ExtArgs> | null
    /**
     * Filter which propriet_ to delete.
     */
    where: propriet_WhereUniqueInput
  }

  /**
   * propriet_ deleteMany
   */
  export type propriet_DeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which propriet_s to delete
     */
    where?: propriet_WhereInput
    /**
     * Limit how many propriet_s to delete.
     */
    limit?: number
  }

  /**
   * propriet_ without action
   */
  export type propriet_DefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propriet_
     */
    select?: propriet_Select<ExtArgs> | null
    /**
     * Omit specific fields from the propriet_
     */
    omit?: propriet_Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propriet_Include<ExtArgs> | null
  }


  /**
   * Model sessioni
   */

  export type AggregateSessioni = {
    _count: SessioniCountAggregateOutputType | null
    _avg: SessioniAvgAggregateOutputType | null
    _sum: SessioniSumAggregateOutputType | null
    _min: SessioniMinAggregateOutputType | null
    _max: SessioniMaxAggregateOutputType | null
  }

  export type SessioniAvgAggregateOutputType = {
    id: number | null
    id_cittadino: number | null
  }

  export type SessioniSumAggregateOutputType = {
    id: number | null
    id_cittadino: number | null
  }

  export type SessioniMinAggregateOutputType = {
    id: number | null
    id_cittadino: number | null
  }

  export type SessioniMaxAggregateOutputType = {
    id: number | null
    id_cittadino: number | null
  }

  export type SessioniCountAggregateOutputType = {
    id: number
    id_cittadino: number
    _all: number
  }


  export type SessioniAvgAggregateInputType = {
    id?: true
    id_cittadino?: true
  }

  export type SessioniSumAggregateInputType = {
    id?: true
    id_cittadino?: true
  }

  export type SessioniMinAggregateInputType = {
    id?: true
    id_cittadino?: true
  }

  export type SessioniMaxAggregateInputType = {
    id?: true
    id_cittadino?: true
  }

  export type SessioniCountAggregateInputType = {
    id?: true
    id_cittadino?: true
    _all?: true
  }

  export type SessioniAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sessioni to aggregate.
     */
    where?: sessioniWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessionis to fetch.
     */
    orderBy?: sessioniOrderByWithRelationInput | sessioniOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: sessioniWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessionis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessionis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned sessionis
    **/
    _count?: true | SessioniCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SessioniAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SessioniSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessioniMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessioniMaxAggregateInputType
  }

  export type GetSessioniAggregateType<T extends SessioniAggregateArgs> = {
        [P in keyof T & keyof AggregateSessioni]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSessioni[P]>
      : GetScalarType<T[P], AggregateSessioni[P]>
  }




  export type sessioniGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sessioniWhereInput
    orderBy?: sessioniOrderByWithAggregationInput | sessioniOrderByWithAggregationInput[]
    by: SessioniScalarFieldEnum[] | SessioniScalarFieldEnum
    having?: sessioniScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessioniCountAggregateInputType | true
    _avg?: SessioniAvgAggregateInputType
    _sum?: SessioniSumAggregateInputType
    _min?: SessioniMinAggregateInputType
    _max?: SessioniMaxAggregateInputType
  }

  export type SessioniGroupByOutputType = {
    id: number
    id_cittadino: number
    _count: SessioniCountAggregateOutputType | null
    _avg: SessioniAvgAggregateOutputType | null
    _sum: SessioniSumAggregateOutputType | null
    _min: SessioniMinAggregateOutputType | null
    _max: SessioniMaxAggregateOutputType | null
  }

  type GetSessioniGroupByPayload<T extends sessioniGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessioniGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessioniGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessioniGroupByOutputType[P]>
            : GetScalarType<T[P], SessioniGroupByOutputType[P]>
        }
      >
    >


  export type sessioniSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_cittadino?: boolean
    ecoscores?: boolean | sessioni$ecoscoresArgs<ExtArgs>
    cittadini?: boolean | cittadiniDefaultArgs<ExtArgs>
    _count?: boolean | SessioniCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sessioni"]>

  export type sessioniSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_cittadino?: boolean
    cittadini?: boolean | cittadiniDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sessioni"]>

  export type sessioniSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_cittadino?: boolean
    cittadini?: boolean | cittadiniDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sessioni"]>

  export type sessioniSelectScalar = {
    id?: boolean
    id_cittadino?: boolean
  }

  export type sessioniOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "id_cittadino", ExtArgs["result"]["sessioni"]>
  export type sessioniInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ecoscores?: boolean | sessioni$ecoscoresArgs<ExtArgs>
    cittadini?: boolean | cittadiniDefaultArgs<ExtArgs>
    _count?: boolean | SessioniCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type sessioniIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cittadini?: boolean | cittadiniDefaultArgs<ExtArgs>
  }
  export type sessioniIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cittadini?: boolean | cittadiniDefaultArgs<ExtArgs>
  }

  export type $sessioniPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "sessioni"
    objects: {
      ecoscores: Prisma.$ecoscoresPayload<ExtArgs>[]
      cittadini: Prisma.$cittadiniPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      id_cittadino: number
    }, ExtArgs["result"]["sessioni"]>
    composites: {}
  }

  type sessioniGetPayload<S extends boolean | null | undefined | sessioniDefaultArgs> = $Result.GetResult<Prisma.$sessioniPayload, S>

  type sessioniCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<sessioniFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessioniCountAggregateInputType | true
    }

  export interface sessioniDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['sessioni'], meta: { name: 'sessioni' } }
    /**
     * Find zero or one Sessioni that matches the filter.
     * @param {sessioniFindUniqueArgs} args - Arguments to find a Sessioni
     * @example
     * // Get one Sessioni
     * const sessioni = await prisma.sessioni.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends sessioniFindUniqueArgs>(args: SelectSubset<T, sessioniFindUniqueArgs<ExtArgs>>): Prisma__sessioniClient<$Result.GetResult<Prisma.$sessioniPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sessioni that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {sessioniFindUniqueOrThrowArgs} args - Arguments to find a Sessioni
     * @example
     * // Get one Sessioni
     * const sessioni = await prisma.sessioni.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends sessioniFindUniqueOrThrowArgs>(args: SelectSubset<T, sessioniFindUniqueOrThrowArgs<ExtArgs>>): Prisma__sessioniClient<$Result.GetResult<Prisma.$sessioniPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sessioni that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessioniFindFirstArgs} args - Arguments to find a Sessioni
     * @example
     * // Get one Sessioni
     * const sessioni = await prisma.sessioni.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends sessioniFindFirstArgs>(args?: SelectSubset<T, sessioniFindFirstArgs<ExtArgs>>): Prisma__sessioniClient<$Result.GetResult<Prisma.$sessioniPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sessioni that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessioniFindFirstOrThrowArgs} args - Arguments to find a Sessioni
     * @example
     * // Get one Sessioni
     * const sessioni = await prisma.sessioni.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends sessioniFindFirstOrThrowArgs>(args?: SelectSubset<T, sessioniFindFirstOrThrowArgs<ExtArgs>>): Prisma__sessioniClient<$Result.GetResult<Prisma.$sessioniPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessionis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessioniFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessionis
     * const sessionis = await prisma.sessioni.findMany()
     * 
     * // Get first 10 Sessionis
     * const sessionis = await prisma.sessioni.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessioniWithIdOnly = await prisma.sessioni.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends sessioniFindManyArgs>(args?: SelectSubset<T, sessioniFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sessioniPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sessioni.
     * @param {sessioniCreateArgs} args - Arguments to create a Sessioni.
     * @example
     * // Create one Sessioni
     * const Sessioni = await prisma.sessioni.create({
     *   data: {
     *     // ... data to create a Sessioni
     *   }
     * })
     * 
     */
    create<T extends sessioniCreateArgs>(args: SelectSubset<T, sessioniCreateArgs<ExtArgs>>): Prisma__sessioniClient<$Result.GetResult<Prisma.$sessioniPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessionis.
     * @param {sessioniCreateManyArgs} args - Arguments to create many Sessionis.
     * @example
     * // Create many Sessionis
     * const sessioni = await prisma.sessioni.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends sessioniCreateManyArgs>(args?: SelectSubset<T, sessioniCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessionis and returns the data saved in the database.
     * @param {sessioniCreateManyAndReturnArgs} args - Arguments to create many Sessionis.
     * @example
     * // Create many Sessionis
     * const sessioni = await prisma.sessioni.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessionis and only return the `id`
     * const sessioniWithIdOnly = await prisma.sessioni.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends sessioniCreateManyAndReturnArgs>(args?: SelectSubset<T, sessioniCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sessioniPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sessioni.
     * @param {sessioniDeleteArgs} args - Arguments to delete one Sessioni.
     * @example
     * // Delete one Sessioni
     * const Sessioni = await prisma.sessioni.delete({
     *   where: {
     *     // ... filter to delete one Sessioni
     *   }
     * })
     * 
     */
    delete<T extends sessioniDeleteArgs>(args: SelectSubset<T, sessioniDeleteArgs<ExtArgs>>): Prisma__sessioniClient<$Result.GetResult<Prisma.$sessioniPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sessioni.
     * @param {sessioniUpdateArgs} args - Arguments to update one Sessioni.
     * @example
     * // Update one Sessioni
     * const sessioni = await prisma.sessioni.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends sessioniUpdateArgs>(args: SelectSubset<T, sessioniUpdateArgs<ExtArgs>>): Prisma__sessioniClient<$Result.GetResult<Prisma.$sessioniPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessionis.
     * @param {sessioniDeleteManyArgs} args - Arguments to filter Sessionis to delete.
     * @example
     * // Delete a few Sessionis
     * const { count } = await prisma.sessioni.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends sessioniDeleteManyArgs>(args?: SelectSubset<T, sessioniDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessionis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessioniUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessionis
     * const sessioni = await prisma.sessioni.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends sessioniUpdateManyArgs>(args: SelectSubset<T, sessioniUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessionis and returns the data updated in the database.
     * @param {sessioniUpdateManyAndReturnArgs} args - Arguments to update many Sessionis.
     * @example
     * // Update many Sessionis
     * const sessioni = await prisma.sessioni.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessionis and only return the `id`
     * const sessioniWithIdOnly = await prisma.sessioni.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends sessioniUpdateManyAndReturnArgs>(args: SelectSubset<T, sessioniUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sessioniPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sessioni.
     * @param {sessioniUpsertArgs} args - Arguments to update or create a Sessioni.
     * @example
     * // Update or create a Sessioni
     * const sessioni = await prisma.sessioni.upsert({
     *   create: {
     *     // ... data to create a Sessioni
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sessioni we want to update
     *   }
     * })
     */
    upsert<T extends sessioniUpsertArgs>(args: SelectSubset<T, sessioniUpsertArgs<ExtArgs>>): Prisma__sessioniClient<$Result.GetResult<Prisma.$sessioniPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessionis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessioniCountArgs} args - Arguments to filter Sessionis to count.
     * @example
     * // Count the number of Sessionis
     * const count = await prisma.sessioni.count({
     *   where: {
     *     // ... the filter for the Sessionis we want to count
     *   }
     * })
    **/
    count<T extends sessioniCountArgs>(
      args?: Subset<T, sessioniCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessioniCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sessioni.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessioniAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessioniAggregateArgs>(args: Subset<T, SessioniAggregateArgs>): Prisma.PrismaPromise<GetSessioniAggregateType<T>>

    /**
     * Group by Sessioni.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessioniGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends sessioniGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: sessioniGroupByArgs['orderBy'] }
        : { orderBy?: sessioniGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, sessioniGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessioniGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the sessioni model
   */
  readonly fields: sessioniFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for sessioni.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__sessioniClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ecoscores<T extends sessioni$ecoscoresArgs<ExtArgs> = {}>(args?: Subset<T, sessioni$ecoscoresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ecoscoresPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cittadini<T extends cittadiniDefaultArgs<ExtArgs> = {}>(args?: Subset<T, cittadiniDefaultArgs<ExtArgs>>): Prisma__cittadiniClient<$Result.GetResult<Prisma.$cittadiniPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the sessioni model
   */
  interface sessioniFieldRefs {
    readonly id: FieldRef<"sessioni", 'Int'>
    readonly id_cittadino: FieldRef<"sessioni", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * sessioni findUnique
   */
  export type sessioniFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessioni
     */
    select?: sessioniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sessioni
     */
    omit?: sessioniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessioniInclude<ExtArgs> | null
    /**
     * Filter, which sessioni to fetch.
     */
    where: sessioniWhereUniqueInput
  }

  /**
   * sessioni findUniqueOrThrow
   */
  export type sessioniFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessioni
     */
    select?: sessioniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sessioni
     */
    omit?: sessioniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessioniInclude<ExtArgs> | null
    /**
     * Filter, which sessioni to fetch.
     */
    where: sessioniWhereUniqueInput
  }

  /**
   * sessioni findFirst
   */
  export type sessioniFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessioni
     */
    select?: sessioniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sessioni
     */
    omit?: sessioniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessioniInclude<ExtArgs> | null
    /**
     * Filter, which sessioni to fetch.
     */
    where?: sessioniWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessionis to fetch.
     */
    orderBy?: sessioniOrderByWithRelationInput | sessioniOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sessionis.
     */
    cursor?: sessioniWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessionis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessionis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sessionis.
     */
    distinct?: SessioniScalarFieldEnum | SessioniScalarFieldEnum[]
  }

  /**
   * sessioni findFirstOrThrow
   */
  export type sessioniFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessioni
     */
    select?: sessioniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sessioni
     */
    omit?: sessioniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessioniInclude<ExtArgs> | null
    /**
     * Filter, which sessioni to fetch.
     */
    where?: sessioniWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessionis to fetch.
     */
    orderBy?: sessioniOrderByWithRelationInput | sessioniOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sessionis.
     */
    cursor?: sessioniWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessionis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessionis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sessionis.
     */
    distinct?: SessioniScalarFieldEnum | SessioniScalarFieldEnum[]
  }

  /**
   * sessioni findMany
   */
  export type sessioniFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessioni
     */
    select?: sessioniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sessioni
     */
    omit?: sessioniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessioniInclude<ExtArgs> | null
    /**
     * Filter, which sessionis to fetch.
     */
    where?: sessioniWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessionis to fetch.
     */
    orderBy?: sessioniOrderByWithRelationInput | sessioniOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing sessionis.
     */
    cursor?: sessioniWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessionis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessionis.
     */
    skip?: number
    distinct?: SessioniScalarFieldEnum | SessioniScalarFieldEnum[]
  }

  /**
   * sessioni create
   */
  export type sessioniCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessioni
     */
    select?: sessioniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sessioni
     */
    omit?: sessioniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessioniInclude<ExtArgs> | null
    /**
     * The data needed to create a sessioni.
     */
    data: XOR<sessioniCreateInput, sessioniUncheckedCreateInput>
  }

  /**
   * sessioni createMany
   */
  export type sessioniCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many sessionis.
     */
    data: sessioniCreateManyInput | sessioniCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * sessioni createManyAndReturn
   */
  export type sessioniCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessioni
     */
    select?: sessioniSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the sessioni
     */
    omit?: sessioniOmit<ExtArgs> | null
    /**
     * The data used to create many sessionis.
     */
    data: sessioniCreateManyInput | sessioniCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessioniIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * sessioni update
   */
  export type sessioniUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessioni
     */
    select?: sessioniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sessioni
     */
    omit?: sessioniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessioniInclude<ExtArgs> | null
    /**
     * The data needed to update a sessioni.
     */
    data: XOR<sessioniUpdateInput, sessioniUncheckedUpdateInput>
    /**
     * Choose, which sessioni to update.
     */
    where: sessioniWhereUniqueInput
  }

  /**
   * sessioni updateMany
   */
  export type sessioniUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update sessionis.
     */
    data: XOR<sessioniUpdateManyMutationInput, sessioniUncheckedUpdateManyInput>
    /**
     * Filter which sessionis to update
     */
    where?: sessioniWhereInput
    /**
     * Limit how many sessionis to update.
     */
    limit?: number
  }

  /**
   * sessioni updateManyAndReturn
   */
  export type sessioniUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessioni
     */
    select?: sessioniSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the sessioni
     */
    omit?: sessioniOmit<ExtArgs> | null
    /**
     * The data used to update sessionis.
     */
    data: XOR<sessioniUpdateManyMutationInput, sessioniUncheckedUpdateManyInput>
    /**
     * Filter which sessionis to update
     */
    where?: sessioniWhereInput
    /**
     * Limit how many sessionis to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessioniIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * sessioni upsert
   */
  export type sessioniUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessioni
     */
    select?: sessioniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sessioni
     */
    omit?: sessioniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessioniInclude<ExtArgs> | null
    /**
     * The filter to search for the sessioni to update in case it exists.
     */
    where: sessioniWhereUniqueInput
    /**
     * In case the sessioni found by the `where` argument doesn't exist, create a new sessioni with this data.
     */
    create: XOR<sessioniCreateInput, sessioniUncheckedCreateInput>
    /**
     * In case the sessioni was found with the provided `where` argument, update it with this data.
     */
    update: XOR<sessioniUpdateInput, sessioniUncheckedUpdateInput>
  }

  /**
   * sessioni delete
   */
  export type sessioniDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessioni
     */
    select?: sessioniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sessioni
     */
    omit?: sessioniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessioniInclude<ExtArgs> | null
    /**
     * Filter which sessioni to delete.
     */
    where: sessioniWhereUniqueInput
  }

  /**
   * sessioni deleteMany
   */
  export type sessioniDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sessionis to delete
     */
    where?: sessioniWhereInput
    /**
     * Limit how many sessionis to delete.
     */
    limit?: number
  }

  /**
   * sessioni.ecoscores
   */
  export type sessioni$ecoscoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ecoscores
     */
    select?: ecoscoresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ecoscores
     */
    omit?: ecoscoresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ecoscoresInclude<ExtArgs> | null
    where?: ecoscoresWhereInput
    orderBy?: ecoscoresOrderByWithRelationInput | ecoscoresOrderByWithRelationInput[]
    cursor?: ecoscoresWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EcoscoresScalarFieldEnum | EcoscoresScalarFieldEnum[]
  }

  /**
   * sessioni without action
   */
  export type sessioniDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sessioni
     */
    select?: sessioniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sessioni
     */
    omit?: sessioniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessioniInclude<ExtArgs> | null
  }


  /**
   * Model spatial_ref_sys
   */

  export type AggregateSpatial_ref_sys = {
    _count: Spatial_ref_sysCountAggregateOutputType | null
    _avg: Spatial_ref_sysAvgAggregateOutputType | null
    _sum: Spatial_ref_sysSumAggregateOutputType | null
    _min: Spatial_ref_sysMinAggregateOutputType | null
    _max: Spatial_ref_sysMaxAggregateOutputType | null
  }

  export type Spatial_ref_sysAvgAggregateOutputType = {
    srid: number | null
    auth_srid: number | null
  }

  export type Spatial_ref_sysSumAggregateOutputType = {
    srid: number | null
    auth_srid: number | null
  }

  export type Spatial_ref_sysMinAggregateOutputType = {
    srid: number | null
    auth_name: string | null
    auth_srid: number | null
    srtext: string | null
    proj4text: string | null
  }

  export type Spatial_ref_sysMaxAggregateOutputType = {
    srid: number | null
    auth_name: string | null
    auth_srid: number | null
    srtext: string | null
    proj4text: string | null
  }

  export type Spatial_ref_sysCountAggregateOutputType = {
    srid: number
    auth_name: number
    auth_srid: number
    srtext: number
    proj4text: number
    _all: number
  }


  export type Spatial_ref_sysAvgAggregateInputType = {
    srid?: true
    auth_srid?: true
  }

  export type Spatial_ref_sysSumAggregateInputType = {
    srid?: true
    auth_srid?: true
  }

  export type Spatial_ref_sysMinAggregateInputType = {
    srid?: true
    auth_name?: true
    auth_srid?: true
    srtext?: true
    proj4text?: true
  }

  export type Spatial_ref_sysMaxAggregateInputType = {
    srid?: true
    auth_name?: true
    auth_srid?: true
    srtext?: true
    proj4text?: true
  }

  export type Spatial_ref_sysCountAggregateInputType = {
    srid?: true
    auth_name?: true
    auth_srid?: true
    srtext?: true
    proj4text?: true
    _all?: true
  }

  export type Spatial_ref_sysAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which spatial_ref_sys to aggregate.
     */
    where?: spatial_ref_sysWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spatial_ref_sys to fetch.
     */
    orderBy?: spatial_ref_sysOrderByWithRelationInput | spatial_ref_sysOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: spatial_ref_sysWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spatial_ref_sys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spatial_ref_sys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned spatial_ref_sys
    **/
    _count?: true | Spatial_ref_sysCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Spatial_ref_sysAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Spatial_ref_sysSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Spatial_ref_sysMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Spatial_ref_sysMaxAggregateInputType
  }

  export type GetSpatial_ref_sysAggregateType<T extends Spatial_ref_sysAggregateArgs> = {
        [P in keyof T & keyof AggregateSpatial_ref_sys]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpatial_ref_sys[P]>
      : GetScalarType<T[P], AggregateSpatial_ref_sys[P]>
  }




  export type spatial_ref_sysGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: spatial_ref_sysWhereInput
    orderBy?: spatial_ref_sysOrderByWithAggregationInput | spatial_ref_sysOrderByWithAggregationInput[]
    by: Spatial_ref_sysScalarFieldEnum[] | Spatial_ref_sysScalarFieldEnum
    having?: spatial_ref_sysScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Spatial_ref_sysCountAggregateInputType | true
    _avg?: Spatial_ref_sysAvgAggregateInputType
    _sum?: Spatial_ref_sysSumAggregateInputType
    _min?: Spatial_ref_sysMinAggregateInputType
    _max?: Spatial_ref_sysMaxAggregateInputType
  }

  export type Spatial_ref_sysGroupByOutputType = {
    srid: number
    auth_name: string | null
    auth_srid: number | null
    srtext: string | null
    proj4text: string | null
    _count: Spatial_ref_sysCountAggregateOutputType | null
    _avg: Spatial_ref_sysAvgAggregateOutputType | null
    _sum: Spatial_ref_sysSumAggregateOutputType | null
    _min: Spatial_ref_sysMinAggregateOutputType | null
    _max: Spatial_ref_sysMaxAggregateOutputType | null
  }

  type GetSpatial_ref_sysGroupByPayload<T extends spatial_ref_sysGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Spatial_ref_sysGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Spatial_ref_sysGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Spatial_ref_sysGroupByOutputType[P]>
            : GetScalarType<T[P], Spatial_ref_sysGroupByOutputType[P]>
        }
      >
    >


  export type spatial_ref_sysSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    srid?: boolean
    auth_name?: boolean
    auth_srid?: boolean
    srtext?: boolean
    proj4text?: boolean
  }, ExtArgs["result"]["spatial_ref_sys"]>

  export type spatial_ref_sysSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    srid?: boolean
    auth_name?: boolean
    auth_srid?: boolean
    srtext?: boolean
    proj4text?: boolean
  }, ExtArgs["result"]["spatial_ref_sys"]>

  export type spatial_ref_sysSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    srid?: boolean
    auth_name?: boolean
    auth_srid?: boolean
    srtext?: boolean
    proj4text?: boolean
  }, ExtArgs["result"]["spatial_ref_sys"]>

  export type spatial_ref_sysSelectScalar = {
    srid?: boolean
    auth_name?: boolean
    auth_srid?: boolean
    srtext?: boolean
    proj4text?: boolean
  }

  export type spatial_ref_sysOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"srid" | "auth_name" | "auth_srid" | "srtext" | "proj4text", ExtArgs["result"]["spatial_ref_sys"]>

  export type $spatial_ref_sysPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "spatial_ref_sys"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      srid: number
      auth_name: string | null
      auth_srid: number | null
      srtext: string | null
      proj4text: string | null
    }, ExtArgs["result"]["spatial_ref_sys"]>
    composites: {}
  }

  type spatial_ref_sysGetPayload<S extends boolean | null | undefined | spatial_ref_sysDefaultArgs> = $Result.GetResult<Prisma.$spatial_ref_sysPayload, S>

  type spatial_ref_sysCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<spatial_ref_sysFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Spatial_ref_sysCountAggregateInputType | true
    }

  export interface spatial_ref_sysDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['spatial_ref_sys'], meta: { name: 'spatial_ref_sys' } }
    /**
     * Find zero or one Spatial_ref_sys that matches the filter.
     * @param {spatial_ref_sysFindUniqueArgs} args - Arguments to find a Spatial_ref_sys
     * @example
     * // Get one Spatial_ref_sys
     * const spatial_ref_sys = await prisma.spatial_ref_sys.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends spatial_ref_sysFindUniqueArgs>(args: SelectSubset<T, spatial_ref_sysFindUniqueArgs<ExtArgs>>): Prisma__spatial_ref_sysClient<$Result.GetResult<Prisma.$spatial_ref_sysPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Spatial_ref_sys that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {spatial_ref_sysFindUniqueOrThrowArgs} args - Arguments to find a Spatial_ref_sys
     * @example
     * // Get one Spatial_ref_sys
     * const spatial_ref_sys = await prisma.spatial_ref_sys.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends spatial_ref_sysFindUniqueOrThrowArgs>(args: SelectSubset<T, spatial_ref_sysFindUniqueOrThrowArgs<ExtArgs>>): Prisma__spatial_ref_sysClient<$Result.GetResult<Prisma.$spatial_ref_sysPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Spatial_ref_sys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spatial_ref_sysFindFirstArgs} args - Arguments to find a Spatial_ref_sys
     * @example
     * // Get one Spatial_ref_sys
     * const spatial_ref_sys = await prisma.spatial_ref_sys.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends spatial_ref_sysFindFirstArgs>(args?: SelectSubset<T, spatial_ref_sysFindFirstArgs<ExtArgs>>): Prisma__spatial_ref_sysClient<$Result.GetResult<Prisma.$spatial_ref_sysPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Spatial_ref_sys that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spatial_ref_sysFindFirstOrThrowArgs} args - Arguments to find a Spatial_ref_sys
     * @example
     * // Get one Spatial_ref_sys
     * const spatial_ref_sys = await prisma.spatial_ref_sys.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends spatial_ref_sysFindFirstOrThrowArgs>(args?: SelectSubset<T, spatial_ref_sysFindFirstOrThrowArgs<ExtArgs>>): Prisma__spatial_ref_sysClient<$Result.GetResult<Prisma.$spatial_ref_sysPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Spatial_ref_sys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spatial_ref_sysFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Spatial_ref_sys
     * const spatial_ref_sys = await prisma.spatial_ref_sys.findMany()
     * 
     * // Get first 10 Spatial_ref_sys
     * const spatial_ref_sys = await prisma.spatial_ref_sys.findMany({ take: 10 })
     * 
     * // Only select the `srid`
     * const spatial_ref_sysWithSridOnly = await prisma.spatial_ref_sys.findMany({ select: { srid: true } })
     * 
     */
    findMany<T extends spatial_ref_sysFindManyArgs>(args?: SelectSubset<T, spatial_ref_sysFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spatial_ref_sysPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Spatial_ref_sys.
     * @param {spatial_ref_sysCreateArgs} args - Arguments to create a Spatial_ref_sys.
     * @example
     * // Create one Spatial_ref_sys
     * const Spatial_ref_sys = await prisma.spatial_ref_sys.create({
     *   data: {
     *     // ... data to create a Spatial_ref_sys
     *   }
     * })
     * 
     */
    create<T extends spatial_ref_sysCreateArgs>(args: SelectSubset<T, spatial_ref_sysCreateArgs<ExtArgs>>): Prisma__spatial_ref_sysClient<$Result.GetResult<Prisma.$spatial_ref_sysPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Spatial_ref_sys.
     * @param {spatial_ref_sysCreateManyArgs} args - Arguments to create many Spatial_ref_sys.
     * @example
     * // Create many Spatial_ref_sys
     * const spatial_ref_sys = await prisma.spatial_ref_sys.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends spatial_ref_sysCreateManyArgs>(args?: SelectSubset<T, spatial_ref_sysCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Spatial_ref_sys and returns the data saved in the database.
     * @param {spatial_ref_sysCreateManyAndReturnArgs} args - Arguments to create many Spatial_ref_sys.
     * @example
     * // Create many Spatial_ref_sys
     * const spatial_ref_sys = await prisma.spatial_ref_sys.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Spatial_ref_sys and only return the `srid`
     * const spatial_ref_sysWithSridOnly = await prisma.spatial_ref_sys.createManyAndReturn({
     *   select: { srid: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends spatial_ref_sysCreateManyAndReturnArgs>(args?: SelectSubset<T, spatial_ref_sysCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spatial_ref_sysPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Spatial_ref_sys.
     * @param {spatial_ref_sysDeleteArgs} args - Arguments to delete one Spatial_ref_sys.
     * @example
     * // Delete one Spatial_ref_sys
     * const Spatial_ref_sys = await prisma.spatial_ref_sys.delete({
     *   where: {
     *     // ... filter to delete one Spatial_ref_sys
     *   }
     * })
     * 
     */
    delete<T extends spatial_ref_sysDeleteArgs>(args: SelectSubset<T, spatial_ref_sysDeleteArgs<ExtArgs>>): Prisma__spatial_ref_sysClient<$Result.GetResult<Prisma.$spatial_ref_sysPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Spatial_ref_sys.
     * @param {spatial_ref_sysUpdateArgs} args - Arguments to update one Spatial_ref_sys.
     * @example
     * // Update one Spatial_ref_sys
     * const spatial_ref_sys = await prisma.spatial_ref_sys.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends spatial_ref_sysUpdateArgs>(args: SelectSubset<T, spatial_ref_sysUpdateArgs<ExtArgs>>): Prisma__spatial_ref_sysClient<$Result.GetResult<Prisma.$spatial_ref_sysPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Spatial_ref_sys.
     * @param {spatial_ref_sysDeleteManyArgs} args - Arguments to filter Spatial_ref_sys to delete.
     * @example
     * // Delete a few Spatial_ref_sys
     * const { count } = await prisma.spatial_ref_sys.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends spatial_ref_sysDeleteManyArgs>(args?: SelectSubset<T, spatial_ref_sysDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Spatial_ref_sys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spatial_ref_sysUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Spatial_ref_sys
     * const spatial_ref_sys = await prisma.spatial_ref_sys.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends spatial_ref_sysUpdateManyArgs>(args: SelectSubset<T, spatial_ref_sysUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Spatial_ref_sys and returns the data updated in the database.
     * @param {spatial_ref_sysUpdateManyAndReturnArgs} args - Arguments to update many Spatial_ref_sys.
     * @example
     * // Update many Spatial_ref_sys
     * const spatial_ref_sys = await prisma.spatial_ref_sys.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Spatial_ref_sys and only return the `srid`
     * const spatial_ref_sysWithSridOnly = await prisma.spatial_ref_sys.updateManyAndReturn({
     *   select: { srid: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends spatial_ref_sysUpdateManyAndReturnArgs>(args: SelectSubset<T, spatial_ref_sysUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spatial_ref_sysPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Spatial_ref_sys.
     * @param {spatial_ref_sysUpsertArgs} args - Arguments to update or create a Spatial_ref_sys.
     * @example
     * // Update or create a Spatial_ref_sys
     * const spatial_ref_sys = await prisma.spatial_ref_sys.upsert({
     *   create: {
     *     // ... data to create a Spatial_ref_sys
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Spatial_ref_sys we want to update
     *   }
     * })
     */
    upsert<T extends spatial_ref_sysUpsertArgs>(args: SelectSubset<T, spatial_ref_sysUpsertArgs<ExtArgs>>): Prisma__spatial_ref_sysClient<$Result.GetResult<Prisma.$spatial_ref_sysPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Spatial_ref_sys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spatial_ref_sysCountArgs} args - Arguments to filter Spatial_ref_sys to count.
     * @example
     * // Count the number of Spatial_ref_sys
     * const count = await prisma.spatial_ref_sys.count({
     *   where: {
     *     // ... the filter for the Spatial_ref_sys we want to count
     *   }
     * })
    **/
    count<T extends spatial_ref_sysCountArgs>(
      args?: Subset<T, spatial_ref_sysCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Spatial_ref_sysCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Spatial_ref_sys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Spatial_ref_sysAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Spatial_ref_sysAggregateArgs>(args: Subset<T, Spatial_ref_sysAggregateArgs>): Prisma.PrismaPromise<GetSpatial_ref_sysAggregateType<T>>

    /**
     * Group by Spatial_ref_sys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spatial_ref_sysGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends spatial_ref_sysGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: spatial_ref_sysGroupByArgs['orderBy'] }
        : { orderBy?: spatial_ref_sysGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, spatial_ref_sysGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpatial_ref_sysGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the spatial_ref_sys model
   */
  readonly fields: spatial_ref_sysFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for spatial_ref_sys.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__spatial_ref_sysClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the spatial_ref_sys model
   */
  interface spatial_ref_sysFieldRefs {
    readonly srid: FieldRef<"spatial_ref_sys", 'Int'>
    readonly auth_name: FieldRef<"spatial_ref_sys", 'String'>
    readonly auth_srid: FieldRef<"spatial_ref_sys", 'Int'>
    readonly srtext: FieldRef<"spatial_ref_sys", 'String'>
    readonly proj4text: FieldRef<"spatial_ref_sys", 'String'>
  }
    

  // Custom InputTypes
  /**
   * spatial_ref_sys findUnique
   */
  export type spatial_ref_sysFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spatial_ref_sys
     */
    select?: spatial_ref_sysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spatial_ref_sys
     */
    omit?: spatial_ref_sysOmit<ExtArgs> | null
    /**
     * Filter, which spatial_ref_sys to fetch.
     */
    where: spatial_ref_sysWhereUniqueInput
  }

  /**
   * spatial_ref_sys findUniqueOrThrow
   */
  export type spatial_ref_sysFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spatial_ref_sys
     */
    select?: spatial_ref_sysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spatial_ref_sys
     */
    omit?: spatial_ref_sysOmit<ExtArgs> | null
    /**
     * Filter, which spatial_ref_sys to fetch.
     */
    where: spatial_ref_sysWhereUniqueInput
  }

  /**
   * spatial_ref_sys findFirst
   */
  export type spatial_ref_sysFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spatial_ref_sys
     */
    select?: spatial_ref_sysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spatial_ref_sys
     */
    omit?: spatial_ref_sysOmit<ExtArgs> | null
    /**
     * Filter, which spatial_ref_sys to fetch.
     */
    where?: spatial_ref_sysWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spatial_ref_sys to fetch.
     */
    orderBy?: spatial_ref_sysOrderByWithRelationInput | spatial_ref_sysOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for spatial_ref_sys.
     */
    cursor?: spatial_ref_sysWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spatial_ref_sys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spatial_ref_sys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of spatial_ref_sys.
     */
    distinct?: Spatial_ref_sysScalarFieldEnum | Spatial_ref_sysScalarFieldEnum[]
  }

  /**
   * spatial_ref_sys findFirstOrThrow
   */
  export type spatial_ref_sysFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spatial_ref_sys
     */
    select?: spatial_ref_sysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spatial_ref_sys
     */
    omit?: spatial_ref_sysOmit<ExtArgs> | null
    /**
     * Filter, which spatial_ref_sys to fetch.
     */
    where?: spatial_ref_sysWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spatial_ref_sys to fetch.
     */
    orderBy?: spatial_ref_sysOrderByWithRelationInput | spatial_ref_sysOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for spatial_ref_sys.
     */
    cursor?: spatial_ref_sysWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spatial_ref_sys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spatial_ref_sys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of spatial_ref_sys.
     */
    distinct?: Spatial_ref_sysScalarFieldEnum | Spatial_ref_sysScalarFieldEnum[]
  }

  /**
   * spatial_ref_sys findMany
   */
  export type spatial_ref_sysFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spatial_ref_sys
     */
    select?: spatial_ref_sysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spatial_ref_sys
     */
    omit?: spatial_ref_sysOmit<ExtArgs> | null
    /**
     * Filter, which spatial_ref_sys to fetch.
     */
    where?: spatial_ref_sysWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spatial_ref_sys to fetch.
     */
    orderBy?: spatial_ref_sysOrderByWithRelationInput | spatial_ref_sysOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing spatial_ref_sys.
     */
    cursor?: spatial_ref_sysWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spatial_ref_sys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spatial_ref_sys.
     */
    skip?: number
    distinct?: Spatial_ref_sysScalarFieldEnum | Spatial_ref_sysScalarFieldEnum[]
  }

  /**
   * spatial_ref_sys create
   */
  export type spatial_ref_sysCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spatial_ref_sys
     */
    select?: spatial_ref_sysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spatial_ref_sys
     */
    omit?: spatial_ref_sysOmit<ExtArgs> | null
    /**
     * The data needed to create a spatial_ref_sys.
     */
    data: XOR<spatial_ref_sysCreateInput, spatial_ref_sysUncheckedCreateInput>
  }

  /**
   * spatial_ref_sys createMany
   */
  export type spatial_ref_sysCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many spatial_ref_sys.
     */
    data: spatial_ref_sysCreateManyInput | spatial_ref_sysCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * spatial_ref_sys createManyAndReturn
   */
  export type spatial_ref_sysCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spatial_ref_sys
     */
    select?: spatial_ref_sysSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the spatial_ref_sys
     */
    omit?: spatial_ref_sysOmit<ExtArgs> | null
    /**
     * The data used to create many spatial_ref_sys.
     */
    data: spatial_ref_sysCreateManyInput | spatial_ref_sysCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * spatial_ref_sys update
   */
  export type spatial_ref_sysUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spatial_ref_sys
     */
    select?: spatial_ref_sysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spatial_ref_sys
     */
    omit?: spatial_ref_sysOmit<ExtArgs> | null
    /**
     * The data needed to update a spatial_ref_sys.
     */
    data: XOR<spatial_ref_sysUpdateInput, spatial_ref_sysUncheckedUpdateInput>
    /**
     * Choose, which spatial_ref_sys to update.
     */
    where: spatial_ref_sysWhereUniqueInput
  }

  /**
   * spatial_ref_sys updateMany
   */
  export type spatial_ref_sysUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update spatial_ref_sys.
     */
    data: XOR<spatial_ref_sysUpdateManyMutationInput, spatial_ref_sysUncheckedUpdateManyInput>
    /**
     * Filter which spatial_ref_sys to update
     */
    where?: spatial_ref_sysWhereInput
    /**
     * Limit how many spatial_ref_sys to update.
     */
    limit?: number
  }

  /**
   * spatial_ref_sys updateManyAndReturn
   */
  export type spatial_ref_sysUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spatial_ref_sys
     */
    select?: spatial_ref_sysSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the spatial_ref_sys
     */
    omit?: spatial_ref_sysOmit<ExtArgs> | null
    /**
     * The data used to update spatial_ref_sys.
     */
    data: XOR<spatial_ref_sysUpdateManyMutationInput, spatial_ref_sysUncheckedUpdateManyInput>
    /**
     * Filter which spatial_ref_sys to update
     */
    where?: spatial_ref_sysWhereInput
    /**
     * Limit how many spatial_ref_sys to update.
     */
    limit?: number
  }

  /**
   * spatial_ref_sys upsert
   */
  export type spatial_ref_sysUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spatial_ref_sys
     */
    select?: spatial_ref_sysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spatial_ref_sys
     */
    omit?: spatial_ref_sysOmit<ExtArgs> | null
    /**
     * The filter to search for the spatial_ref_sys to update in case it exists.
     */
    where: spatial_ref_sysWhereUniqueInput
    /**
     * In case the spatial_ref_sys found by the `where` argument doesn't exist, create a new spatial_ref_sys with this data.
     */
    create: XOR<spatial_ref_sysCreateInput, spatial_ref_sysUncheckedCreateInput>
    /**
     * In case the spatial_ref_sys was found with the provided `where` argument, update it with this data.
     */
    update: XOR<spatial_ref_sysUpdateInput, spatial_ref_sysUncheckedUpdateInput>
  }

  /**
   * spatial_ref_sys delete
   */
  export type spatial_ref_sysDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spatial_ref_sys
     */
    select?: spatial_ref_sysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spatial_ref_sys
     */
    omit?: spatial_ref_sysOmit<ExtArgs> | null
    /**
     * Filter which spatial_ref_sys to delete.
     */
    where: spatial_ref_sysWhereUniqueInput
  }

  /**
   * spatial_ref_sys deleteMany
   */
  export type spatial_ref_sysDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which spatial_ref_sys to delete
     */
    where?: spatial_ref_sysWhereInput
    /**
     * Limit how many spatial_ref_sys to delete.
     */
    limit?: number
  }

  /**
   * spatial_ref_sys without action
   */
  export type spatial_ref_sysDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spatial_ref_sys
     */
    select?: spatial_ref_sysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spatial_ref_sys
     */
    omit?: spatial_ref_sysOmit<ExtArgs> | null
  }


  /**
   * Model vetture
   */

  export type AggregateVetture = {
    _count: VettureCountAggregateOutputType | null
    _avg: VettureAvgAggregateOutputType | null
    _sum: VettureSumAggregateOutputType | null
    _min: VettureMinAggregateOutputType | null
    _max: VettureMaxAggregateOutputType | null
  }

  export type VettureAvgAggregateOutputType = {
    id: number | null
    euro: number | null
  }

  export type VettureSumAggregateOutputType = {
    id: number | null
    euro: number | null
  }

  export type VettureMinAggregateOutputType = {
    id: number | null
    nome: string | null
    euro: number | null
    vin: string | null
  }

  export type VettureMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    euro: number | null
    vin: string | null
  }

  export type VettureCountAggregateOutputType = {
    id: number
    nome: number
    euro: number
    vin: number
    _all: number
  }


  export type VettureAvgAggregateInputType = {
    id?: true
    euro?: true
  }

  export type VettureSumAggregateInputType = {
    id?: true
    euro?: true
  }

  export type VettureMinAggregateInputType = {
    id?: true
    nome?: true
    euro?: true
    vin?: true
  }

  export type VettureMaxAggregateInputType = {
    id?: true
    nome?: true
    euro?: true
    vin?: true
  }

  export type VettureCountAggregateInputType = {
    id?: true
    nome?: true
    euro?: true
    vin?: true
    _all?: true
  }

  export type VettureAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which vetture to aggregate.
     */
    where?: vettureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of vettures to fetch.
     */
    orderBy?: vettureOrderByWithRelationInput | vettureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: vettureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` vettures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` vettures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned vettures
    **/
    _count?: true | VettureCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VettureAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VettureSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VettureMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VettureMaxAggregateInputType
  }

  export type GetVettureAggregateType<T extends VettureAggregateArgs> = {
        [P in keyof T & keyof AggregateVetture]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVetture[P]>
      : GetScalarType<T[P], AggregateVetture[P]>
  }




  export type vettureGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: vettureWhereInput
    orderBy?: vettureOrderByWithAggregationInput | vettureOrderByWithAggregationInput[]
    by: VettureScalarFieldEnum[] | VettureScalarFieldEnum
    having?: vettureScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VettureCountAggregateInputType | true
    _avg?: VettureAvgAggregateInputType
    _sum?: VettureSumAggregateInputType
    _min?: VettureMinAggregateInputType
    _max?: VettureMaxAggregateInputType
  }

  export type VettureGroupByOutputType = {
    id: number
    nome: string
    euro: number
    vin: string
    _count: VettureCountAggregateOutputType | null
    _avg: VettureAvgAggregateOutputType | null
    _sum: VettureSumAggregateOutputType | null
    _min: VettureMinAggregateOutputType | null
    _max: VettureMaxAggregateOutputType | null
  }

  type GetVettureGroupByPayload<T extends vettureGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VettureGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VettureGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VettureGroupByOutputType[P]>
            : GetScalarType<T[P], VettureGroupByOutputType[P]>
        }
      >
    >


  export type vettureSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    euro?: boolean
    vin?: boolean
    propriet_?: boolean | vetture$propriet_Args<ExtArgs>
    _count?: boolean | VettureCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vetture"]>

  export type vettureSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    euro?: boolean
    vin?: boolean
  }, ExtArgs["result"]["vetture"]>

  export type vettureSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    euro?: boolean
    vin?: boolean
  }, ExtArgs["result"]["vetture"]>

  export type vettureSelectScalar = {
    id?: boolean
    nome?: boolean
    euro?: boolean
    vin?: boolean
  }

  export type vettureOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "euro" | "vin", ExtArgs["result"]["vetture"]>
  export type vettureInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    propriet_?: boolean | vetture$propriet_Args<ExtArgs>
    _count?: boolean | VettureCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type vettureIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type vettureIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $vetturePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "vetture"
    objects: {
      propriet_: Prisma.$propriet_Payload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string
      euro: number
      vin: string
    }, ExtArgs["result"]["vetture"]>
    composites: {}
  }

  type vettureGetPayload<S extends boolean | null | undefined | vettureDefaultArgs> = $Result.GetResult<Prisma.$vetturePayload, S>

  type vettureCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<vettureFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VettureCountAggregateInputType | true
    }

  export interface vettureDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['vetture'], meta: { name: 'vetture' } }
    /**
     * Find zero or one Vetture that matches the filter.
     * @param {vettureFindUniqueArgs} args - Arguments to find a Vetture
     * @example
     * // Get one Vetture
     * const vetture = await prisma.vetture.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends vettureFindUniqueArgs>(args: SelectSubset<T, vettureFindUniqueArgs<ExtArgs>>): Prisma__vettureClient<$Result.GetResult<Prisma.$vetturePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vetture that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {vettureFindUniqueOrThrowArgs} args - Arguments to find a Vetture
     * @example
     * // Get one Vetture
     * const vetture = await prisma.vetture.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends vettureFindUniqueOrThrowArgs>(args: SelectSubset<T, vettureFindUniqueOrThrowArgs<ExtArgs>>): Prisma__vettureClient<$Result.GetResult<Prisma.$vetturePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vetture that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {vettureFindFirstArgs} args - Arguments to find a Vetture
     * @example
     * // Get one Vetture
     * const vetture = await prisma.vetture.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends vettureFindFirstArgs>(args?: SelectSubset<T, vettureFindFirstArgs<ExtArgs>>): Prisma__vettureClient<$Result.GetResult<Prisma.$vetturePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vetture that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {vettureFindFirstOrThrowArgs} args - Arguments to find a Vetture
     * @example
     * // Get one Vetture
     * const vetture = await prisma.vetture.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends vettureFindFirstOrThrowArgs>(args?: SelectSubset<T, vettureFindFirstOrThrowArgs<ExtArgs>>): Prisma__vettureClient<$Result.GetResult<Prisma.$vetturePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vettures that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {vettureFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vettures
     * const vettures = await prisma.vetture.findMany()
     * 
     * // Get first 10 Vettures
     * const vettures = await prisma.vetture.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vettureWithIdOnly = await prisma.vetture.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends vettureFindManyArgs>(args?: SelectSubset<T, vettureFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$vetturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vetture.
     * @param {vettureCreateArgs} args - Arguments to create a Vetture.
     * @example
     * // Create one Vetture
     * const Vetture = await prisma.vetture.create({
     *   data: {
     *     // ... data to create a Vetture
     *   }
     * })
     * 
     */
    create<T extends vettureCreateArgs>(args: SelectSubset<T, vettureCreateArgs<ExtArgs>>): Prisma__vettureClient<$Result.GetResult<Prisma.$vetturePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vettures.
     * @param {vettureCreateManyArgs} args - Arguments to create many Vettures.
     * @example
     * // Create many Vettures
     * const vetture = await prisma.vetture.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends vettureCreateManyArgs>(args?: SelectSubset<T, vettureCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vettures and returns the data saved in the database.
     * @param {vettureCreateManyAndReturnArgs} args - Arguments to create many Vettures.
     * @example
     * // Create many Vettures
     * const vetture = await prisma.vetture.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vettures and only return the `id`
     * const vettureWithIdOnly = await prisma.vetture.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends vettureCreateManyAndReturnArgs>(args?: SelectSubset<T, vettureCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$vetturePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vetture.
     * @param {vettureDeleteArgs} args - Arguments to delete one Vetture.
     * @example
     * // Delete one Vetture
     * const Vetture = await prisma.vetture.delete({
     *   where: {
     *     // ... filter to delete one Vetture
     *   }
     * })
     * 
     */
    delete<T extends vettureDeleteArgs>(args: SelectSubset<T, vettureDeleteArgs<ExtArgs>>): Prisma__vettureClient<$Result.GetResult<Prisma.$vetturePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vetture.
     * @param {vettureUpdateArgs} args - Arguments to update one Vetture.
     * @example
     * // Update one Vetture
     * const vetture = await prisma.vetture.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends vettureUpdateArgs>(args: SelectSubset<T, vettureUpdateArgs<ExtArgs>>): Prisma__vettureClient<$Result.GetResult<Prisma.$vetturePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vettures.
     * @param {vettureDeleteManyArgs} args - Arguments to filter Vettures to delete.
     * @example
     * // Delete a few Vettures
     * const { count } = await prisma.vetture.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends vettureDeleteManyArgs>(args?: SelectSubset<T, vettureDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vettures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {vettureUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vettures
     * const vetture = await prisma.vetture.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends vettureUpdateManyArgs>(args: SelectSubset<T, vettureUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vettures and returns the data updated in the database.
     * @param {vettureUpdateManyAndReturnArgs} args - Arguments to update many Vettures.
     * @example
     * // Update many Vettures
     * const vetture = await prisma.vetture.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vettures and only return the `id`
     * const vettureWithIdOnly = await prisma.vetture.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends vettureUpdateManyAndReturnArgs>(args: SelectSubset<T, vettureUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$vetturePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vetture.
     * @param {vettureUpsertArgs} args - Arguments to update or create a Vetture.
     * @example
     * // Update or create a Vetture
     * const vetture = await prisma.vetture.upsert({
     *   create: {
     *     // ... data to create a Vetture
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vetture we want to update
     *   }
     * })
     */
    upsert<T extends vettureUpsertArgs>(args: SelectSubset<T, vettureUpsertArgs<ExtArgs>>): Prisma__vettureClient<$Result.GetResult<Prisma.$vetturePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vettures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {vettureCountArgs} args - Arguments to filter Vettures to count.
     * @example
     * // Count the number of Vettures
     * const count = await prisma.vetture.count({
     *   where: {
     *     // ... the filter for the Vettures we want to count
     *   }
     * })
    **/
    count<T extends vettureCountArgs>(
      args?: Subset<T, vettureCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VettureCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vetture.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VettureAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VettureAggregateArgs>(args: Subset<T, VettureAggregateArgs>): Prisma.PrismaPromise<GetVettureAggregateType<T>>

    /**
     * Group by Vetture.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {vettureGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends vettureGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: vettureGroupByArgs['orderBy'] }
        : { orderBy?: vettureGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, vettureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVettureGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the vetture model
   */
  readonly fields: vettureFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for vetture.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__vettureClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    propriet_<T extends vetture$propriet_Args<ExtArgs> = {}>(args?: Subset<T, vetture$propriet_Args<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$propriet_Payload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the vetture model
   */
  interface vettureFieldRefs {
    readonly id: FieldRef<"vetture", 'Int'>
    readonly nome: FieldRef<"vetture", 'String'>
    readonly euro: FieldRef<"vetture", 'Int'>
    readonly vin: FieldRef<"vetture", 'String'>
  }
    

  // Custom InputTypes
  /**
   * vetture findUnique
   */
  export type vettureFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the vetture
     */
    select?: vettureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the vetture
     */
    omit?: vettureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vettureInclude<ExtArgs> | null
    /**
     * Filter, which vetture to fetch.
     */
    where: vettureWhereUniqueInput
  }

  /**
   * vetture findUniqueOrThrow
   */
  export type vettureFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the vetture
     */
    select?: vettureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the vetture
     */
    omit?: vettureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vettureInclude<ExtArgs> | null
    /**
     * Filter, which vetture to fetch.
     */
    where: vettureWhereUniqueInput
  }

  /**
   * vetture findFirst
   */
  export type vettureFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the vetture
     */
    select?: vettureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the vetture
     */
    omit?: vettureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vettureInclude<ExtArgs> | null
    /**
     * Filter, which vetture to fetch.
     */
    where?: vettureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of vettures to fetch.
     */
    orderBy?: vettureOrderByWithRelationInput | vettureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for vettures.
     */
    cursor?: vettureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` vettures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` vettures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of vettures.
     */
    distinct?: VettureScalarFieldEnum | VettureScalarFieldEnum[]
  }

  /**
   * vetture findFirstOrThrow
   */
  export type vettureFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the vetture
     */
    select?: vettureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the vetture
     */
    omit?: vettureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vettureInclude<ExtArgs> | null
    /**
     * Filter, which vetture to fetch.
     */
    where?: vettureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of vettures to fetch.
     */
    orderBy?: vettureOrderByWithRelationInput | vettureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for vettures.
     */
    cursor?: vettureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` vettures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` vettures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of vettures.
     */
    distinct?: VettureScalarFieldEnum | VettureScalarFieldEnum[]
  }

  /**
   * vetture findMany
   */
  export type vettureFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the vetture
     */
    select?: vettureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the vetture
     */
    omit?: vettureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vettureInclude<ExtArgs> | null
    /**
     * Filter, which vettures to fetch.
     */
    where?: vettureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of vettures to fetch.
     */
    orderBy?: vettureOrderByWithRelationInput | vettureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing vettures.
     */
    cursor?: vettureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` vettures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` vettures.
     */
    skip?: number
    distinct?: VettureScalarFieldEnum | VettureScalarFieldEnum[]
  }

  /**
   * vetture create
   */
  export type vettureCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the vetture
     */
    select?: vettureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the vetture
     */
    omit?: vettureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vettureInclude<ExtArgs> | null
    /**
     * The data needed to create a vetture.
     */
    data: XOR<vettureCreateInput, vettureUncheckedCreateInput>
  }

  /**
   * vetture createMany
   */
  export type vettureCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many vettures.
     */
    data: vettureCreateManyInput | vettureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * vetture createManyAndReturn
   */
  export type vettureCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the vetture
     */
    select?: vettureSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the vetture
     */
    omit?: vettureOmit<ExtArgs> | null
    /**
     * The data used to create many vettures.
     */
    data: vettureCreateManyInput | vettureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * vetture update
   */
  export type vettureUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the vetture
     */
    select?: vettureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the vetture
     */
    omit?: vettureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vettureInclude<ExtArgs> | null
    /**
     * The data needed to update a vetture.
     */
    data: XOR<vettureUpdateInput, vettureUncheckedUpdateInput>
    /**
     * Choose, which vetture to update.
     */
    where: vettureWhereUniqueInput
  }

  /**
   * vetture updateMany
   */
  export type vettureUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update vettures.
     */
    data: XOR<vettureUpdateManyMutationInput, vettureUncheckedUpdateManyInput>
    /**
     * Filter which vettures to update
     */
    where?: vettureWhereInput
    /**
     * Limit how many vettures to update.
     */
    limit?: number
  }

  /**
   * vetture updateManyAndReturn
   */
  export type vettureUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the vetture
     */
    select?: vettureSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the vetture
     */
    omit?: vettureOmit<ExtArgs> | null
    /**
     * The data used to update vettures.
     */
    data: XOR<vettureUpdateManyMutationInput, vettureUncheckedUpdateManyInput>
    /**
     * Filter which vettures to update
     */
    where?: vettureWhereInput
    /**
     * Limit how many vettures to update.
     */
    limit?: number
  }

  /**
   * vetture upsert
   */
  export type vettureUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the vetture
     */
    select?: vettureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the vetture
     */
    omit?: vettureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vettureInclude<ExtArgs> | null
    /**
     * The filter to search for the vetture to update in case it exists.
     */
    where: vettureWhereUniqueInput
    /**
     * In case the vetture found by the `where` argument doesn't exist, create a new vetture with this data.
     */
    create: XOR<vettureCreateInput, vettureUncheckedCreateInput>
    /**
     * In case the vetture was found with the provided `where` argument, update it with this data.
     */
    update: XOR<vettureUpdateInput, vettureUncheckedUpdateInput>
  }

  /**
   * vetture delete
   */
  export type vettureDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the vetture
     */
    select?: vettureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the vetture
     */
    omit?: vettureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vettureInclude<ExtArgs> | null
    /**
     * Filter which vetture to delete.
     */
    where: vettureWhereUniqueInput
  }

  /**
   * vetture deleteMany
   */
  export type vettureDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which vettures to delete
     */
    where?: vettureWhereInput
    /**
     * Limit how many vettures to delete.
     */
    limit?: number
  }

  /**
   * vetture.propriet_
   */
  export type vetture$propriet_Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propriet_
     */
    select?: propriet_Select<ExtArgs> | null
    /**
     * Omit specific fields from the propriet_
     */
    omit?: propriet_Omit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propriet_Include<ExtArgs> | null
    where?: propriet_WhereInput
    orderBy?: propriet_OrderByWithRelationInput | propriet_OrderByWithRelationInput[]
    cursor?: propriet_WhereUniqueInput
    take?: number
    skip?: number
    distinct?: Propriet_ScalarFieldEnum | Propriet_ScalarFieldEnum[]
  }

  /**
   * vetture without action
   */
  export type vettureDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the vetture
     */
    select?: vettureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the vetture
     */
    omit?: vettureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vettureInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AreaScalarFieldEnum: {
    id: 'id',
    id_comune: 'id_comune'
  };

  export type AreaScalarFieldEnum = (typeof AreaScalarFieldEnum)[keyof typeof AreaScalarFieldEnum]


  export const CittadiniScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    email: 'email',
    data_nascita: 'data_nascita',
    password: 'password'
  };

  export type CittadiniScalarFieldEnum = (typeof CittadiniScalarFieldEnum)[keyof typeof CittadiniScalarFieldEnum]


  export const ComuniScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    provincia: 'provincia',
    regione: 'regione',
    email: 'email',
    password: 'password'
  };

  export type ComuniScalarFieldEnum = (typeof ComuniScalarFieldEnum)[keyof typeof ComuniScalarFieldEnum]


  export const EcoscoresScalarFieldEnum: {
    id: 'id',
    punteggio: 'punteggio',
    id_area: 'id_area',
    id_sessione: 'id_sessione'
  };

  export type EcoscoresScalarFieldEnum = (typeof EcoscoresScalarFieldEnum)[keyof typeof EcoscoresScalarFieldEnum]


  export const Propriet_ScalarFieldEnum: {
    id: 'id',
    id_cittadino: 'id_cittadino',
    id_vettura: 'id_vettura'
  };

  export type Propriet_ScalarFieldEnum = (typeof Propriet_ScalarFieldEnum)[keyof typeof Propriet_ScalarFieldEnum]


  export const SessioniScalarFieldEnum: {
    id: 'id',
    id_cittadino: 'id_cittadino'
  };

  export type SessioniScalarFieldEnum = (typeof SessioniScalarFieldEnum)[keyof typeof SessioniScalarFieldEnum]


  export const Spatial_ref_sysScalarFieldEnum: {
    srid: 'srid',
    auth_name: 'auth_name',
    auth_srid: 'auth_srid',
    srtext: 'srtext',
    proj4text: 'proj4text'
  };

  export type Spatial_ref_sysScalarFieldEnum = (typeof Spatial_ref_sysScalarFieldEnum)[keyof typeof Spatial_ref_sysScalarFieldEnum]


  export const VettureScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    euro: 'euro',
    vin: 'vin'
  };

  export type VettureScalarFieldEnum = (typeof VettureScalarFieldEnum)[keyof typeof VettureScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type areaWhereInput = {
    AND?: areaWhereInput | areaWhereInput[]
    OR?: areaWhereInput[]
    NOT?: areaWhereInput | areaWhereInput[]
    id?: IntFilter<"area"> | number
    id_comune?: IntFilter<"area"> | number
    comuni?: XOR<ComuniScalarRelationFilter, comuniWhereInput>
    ecoscores?: EcoscoresListRelationFilter
  }

  export type areaOrderByWithRelationInput = {
    id?: SortOrder
    id_comune?: SortOrder
    comuni?: comuniOrderByWithRelationInput
    ecoscores?: ecoscoresOrderByRelationAggregateInput
  }

  export type areaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: areaWhereInput | areaWhereInput[]
    OR?: areaWhereInput[]
    NOT?: areaWhereInput | areaWhereInput[]
    id_comune?: IntFilter<"area"> | number
    comuni?: XOR<ComuniScalarRelationFilter, comuniWhereInput>
    ecoscores?: EcoscoresListRelationFilter
  }, "id">

  export type areaOrderByWithAggregationInput = {
    id?: SortOrder
    id_comune?: SortOrder
    _count?: areaCountOrderByAggregateInput
    _avg?: areaAvgOrderByAggregateInput
    _max?: areaMaxOrderByAggregateInput
    _min?: areaMinOrderByAggregateInput
    _sum?: areaSumOrderByAggregateInput
  }

  export type areaScalarWhereWithAggregatesInput = {
    AND?: areaScalarWhereWithAggregatesInput | areaScalarWhereWithAggregatesInput[]
    OR?: areaScalarWhereWithAggregatesInput[]
    NOT?: areaScalarWhereWithAggregatesInput | areaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"area"> | number
    id_comune?: IntWithAggregatesFilter<"area"> | number
  }

  export type cittadiniWhereInput = {
    AND?: cittadiniWhereInput | cittadiniWhereInput[]
    OR?: cittadiniWhereInput[]
    NOT?: cittadiniWhereInput | cittadiniWhereInput[]
    id?: IntFilter<"cittadini"> | number
    nome?: StringNullableFilter<"cittadini"> | string | null
    email?: StringNullableFilter<"cittadini"> | string | null
    data_nascita?: DateTimeNullableFilter<"cittadini"> | Date | string | null
    password?: StringFilter<"cittadini"> | string
    propriet_?: Propriet_ListRelationFilter
    sessioni?: SessioniListRelationFilter
  }

  export type cittadiniOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    data_nascita?: SortOrderInput | SortOrder
    password?: SortOrder
    propriet_?: propriet_OrderByRelationAggregateInput
    sessioni?: sessioniOrderByRelationAggregateInput
  }

  export type cittadiniWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: cittadiniWhereInput | cittadiniWhereInput[]
    OR?: cittadiniWhereInput[]
    NOT?: cittadiniWhereInput | cittadiniWhereInput[]
    nome?: StringNullableFilter<"cittadini"> | string | null
    data_nascita?: DateTimeNullableFilter<"cittadini"> | Date | string | null
    password?: StringFilter<"cittadini"> | string
    propriet_?: Propriet_ListRelationFilter
    sessioni?: SessioniListRelationFilter
  }, "id" | "email">

  export type cittadiniOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    data_nascita?: SortOrderInput | SortOrder
    password?: SortOrder
    _count?: cittadiniCountOrderByAggregateInput
    _avg?: cittadiniAvgOrderByAggregateInput
    _max?: cittadiniMaxOrderByAggregateInput
    _min?: cittadiniMinOrderByAggregateInput
    _sum?: cittadiniSumOrderByAggregateInput
  }

  export type cittadiniScalarWhereWithAggregatesInput = {
    AND?: cittadiniScalarWhereWithAggregatesInput | cittadiniScalarWhereWithAggregatesInput[]
    OR?: cittadiniScalarWhereWithAggregatesInput[]
    NOT?: cittadiniScalarWhereWithAggregatesInput | cittadiniScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"cittadini"> | number
    nome?: StringNullableWithAggregatesFilter<"cittadini"> | string | null
    email?: StringNullableWithAggregatesFilter<"cittadini"> | string | null
    data_nascita?: DateTimeNullableWithAggregatesFilter<"cittadini"> | Date | string | null
    password?: StringWithAggregatesFilter<"cittadini"> | string
  }

  export type comuniWhereInput = {
    AND?: comuniWhereInput | comuniWhereInput[]
    OR?: comuniWhereInput[]
    NOT?: comuniWhereInput | comuniWhereInput[]
    id?: IntFilter<"comuni"> | number
    nome?: StringFilter<"comuni"> | string
    provincia?: StringFilter<"comuni"> | string
    regione?: StringFilter<"comuni"> | string
    email?: StringNullableFilter<"comuni"> | string | null
    password?: StringFilter<"comuni"> | string
    area?: AreaListRelationFilter
  }

  export type comuniOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    provincia?: SortOrder
    regione?: SortOrder
    email?: SortOrderInput | SortOrder
    password?: SortOrder
    area?: areaOrderByRelationAggregateInput
  }

  export type comuniWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: comuniWhereInput | comuniWhereInput[]
    OR?: comuniWhereInput[]
    NOT?: comuniWhereInput | comuniWhereInput[]
    nome?: StringFilter<"comuni"> | string
    provincia?: StringFilter<"comuni"> | string
    regione?: StringFilter<"comuni"> | string
    password?: StringFilter<"comuni"> | string
    area?: AreaListRelationFilter
  }, "id" | "email">

  export type comuniOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    provincia?: SortOrder
    regione?: SortOrder
    email?: SortOrderInput | SortOrder
    password?: SortOrder
    _count?: comuniCountOrderByAggregateInput
    _avg?: comuniAvgOrderByAggregateInput
    _max?: comuniMaxOrderByAggregateInput
    _min?: comuniMinOrderByAggregateInput
    _sum?: comuniSumOrderByAggregateInput
  }

  export type comuniScalarWhereWithAggregatesInput = {
    AND?: comuniScalarWhereWithAggregatesInput | comuniScalarWhereWithAggregatesInput[]
    OR?: comuniScalarWhereWithAggregatesInput[]
    NOT?: comuniScalarWhereWithAggregatesInput | comuniScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"comuni"> | number
    nome?: StringWithAggregatesFilter<"comuni"> | string
    provincia?: StringWithAggregatesFilter<"comuni"> | string
    regione?: StringWithAggregatesFilter<"comuni"> | string
    email?: StringNullableWithAggregatesFilter<"comuni"> | string | null
    password?: StringWithAggregatesFilter<"comuni"> | string
  }

  export type ecoscoresWhereInput = {
    AND?: ecoscoresWhereInput | ecoscoresWhereInput[]
    OR?: ecoscoresWhereInput[]
    NOT?: ecoscoresWhereInput | ecoscoresWhereInput[]
    id?: IntFilter<"ecoscores"> | number
    punteggio?: FloatNullableFilter<"ecoscores"> | number | null
    id_area?: IntFilter<"ecoscores"> | number
    id_sessione?: IntFilter<"ecoscores"> | number
    area?: XOR<AreaScalarRelationFilter, areaWhereInput>
    sessioni?: XOR<SessioniScalarRelationFilter, sessioniWhereInput>
  }

  export type ecoscoresOrderByWithRelationInput = {
    id?: SortOrder
    punteggio?: SortOrderInput | SortOrder
    id_area?: SortOrder
    id_sessione?: SortOrder
    area?: areaOrderByWithRelationInput
    sessioni?: sessioniOrderByWithRelationInput
  }

  export type ecoscoresWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ecoscoresWhereInput | ecoscoresWhereInput[]
    OR?: ecoscoresWhereInput[]
    NOT?: ecoscoresWhereInput | ecoscoresWhereInput[]
    punteggio?: FloatNullableFilter<"ecoscores"> | number | null
    id_area?: IntFilter<"ecoscores"> | number
    id_sessione?: IntFilter<"ecoscores"> | number
    area?: XOR<AreaScalarRelationFilter, areaWhereInput>
    sessioni?: XOR<SessioniScalarRelationFilter, sessioniWhereInput>
  }, "id">

  export type ecoscoresOrderByWithAggregationInput = {
    id?: SortOrder
    punteggio?: SortOrderInput | SortOrder
    id_area?: SortOrder
    id_sessione?: SortOrder
    _count?: ecoscoresCountOrderByAggregateInput
    _avg?: ecoscoresAvgOrderByAggregateInput
    _max?: ecoscoresMaxOrderByAggregateInput
    _min?: ecoscoresMinOrderByAggregateInput
    _sum?: ecoscoresSumOrderByAggregateInput
  }

  export type ecoscoresScalarWhereWithAggregatesInput = {
    AND?: ecoscoresScalarWhereWithAggregatesInput | ecoscoresScalarWhereWithAggregatesInput[]
    OR?: ecoscoresScalarWhereWithAggregatesInput[]
    NOT?: ecoscoresScalarWhereWithAggregatesInput | ecoscoresScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ecoscores"> | number
    punteggio?: FloatNullableWithAggregatesFilter<"ecoscores"> | number | null
    id_area?: IntWithAggregatesFilter<"ecoscores"> | number
    id_sessione?: IntWithAggregatesFilter<"ecoscores"> | number
  }

  export type propriet_WhereInput = {
    AND?: propriet_WhereInput | propriet_WhereInput[]
    OR?: propriet_WhereInput[]
    NOT?: propriet_WhereInput | propriet_WhereInput[]
    id?: IntFilter<"propriet_"> | number
    id_cittadino?: IntFilter<"propriet_"> | number
    id_vettura?: IntFilter<"propriet_"> | number
    cittadini?: XOR<CittadiniScalarRelationFilter, cittadiniWhereInput>
    vetture?: XOR<VettureScalarRelationFilter, vettureWhereInput>
  }

  export type propriet_OrderByWithRelationInput = {
    id?: SortOrder
    id_cittadino?: SortOrder
    id_vettura?: SortOrder
    cittadini?: cittadiniOrderByWithRelationInput
    vetture?: vettureOrderByWithRelationInput
  }

  export type propriet_WhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: propriet_WhereInput | propriet_WhereInput[]
    OR?: propriet_WhereInput[]
    NOT?: propriet_WhereInput | propriet_WhereInput[]
    id_cittadino?: IntFilter<"propriet_"> | number
    id_vettura?: IntFilter<"propriet_"> | number
    cittadini?: XOR<CittadiniScalarRelationFilter, cittadiniWhereInput>
    vetture?: XOR<VettureScalarRelationFilter, vettureWhereInput>
  }, "id">

  export type propriet_OrderByWithAggregationInput = {
    id?: SortOrder
    id_cittadino?: SortOrder
    id_vettura?: SortOrder
    _count?: propriet_CountOrderByAggregateInput
    _avg?: propriet_AvgOrderByAggregateInput
    _max?: propriet_MaxOrderByAggregateInput
    _min?: propriet_MinOrderByAggregateInput
    _sum?: propriet_SumOrderByAggregateInput
  }

  export type propriet_ScalarWhereWithAggregatesInput = {
    AND?: propriet_ScalarWhereWithAggregatesInput | propriet_ScalarWhereWithAggregatesInput[]
    OR?: propriet_ScalarWhereWithAggregatesInput[]
    NOT?: propriet_ScalarWhereWithAggregatesInput | propriet_ScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"propriet_"> | number
    id_cittadino?: IntWithAggregatesFilter<"propriet_"> | number
    id_vettura?: IntWithAggregatesFilter<"propriet_"> | number
  }

  export type sessioniWhereInput = {
    AND?: sessioniWhereInput | sessioniWhereInput[]
    OR?: sessioniWhereInput[]
    NOT?: sessioniWhereInput | sessioniWhereInput[]
    id?: IntFilter<"sessioni"> | number
    id_cittadino?: IntFilter<"sessioni"> | number
    ecoscores?: EcoscoresListRelationFilter
    cittadini?: XOR<CittadiniScalarRelationFilter, cittadiniWhereInput>
  }

  export type sessioniOrderByWithRelationInput = {
    id?: SortOrder
    id_cittadino?: SortOrder
    ecoscores?: ecoscoresOrderByRelationAggregateInput
    cittadini?: cittadiniOrderByWithRelationInput
  }

  export type sessioniWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: sessioniWhereInput | sessioniWhereInput[]
    OR?: sessioniWhereInput[]
    NOT?: sessioniWhereInput | sessioniWhereInput[]
    id_cittadino?: IntFilter<"sessioni"> | number
    ecoscores?: EcoscoresListRelationFilter
    cittadini?: XOR<CittadiniScalarRelationFilter, cittadiniWhereInput>
  }, "id">

  export type sessioniOrderByWithAggregationInput = {
    id?: SortOrder
    id_cittadino?: SortOrder
    _count?: sessioniCountOrderByAggregateInput
    _avg?: sessioniAvgOrderByAggregateInput
    _max?: sessioniMaxOrderByAggregateInput
    _min?: sessioniMinOrderByAggregateInput
    _sum?: sessioniSumOrderByAggregateInput
  }

  export type sessioniScalarWhereWithAggregatesInput = {
    AND?: sessioniScalarWhereWithAggregatesInput | sessioniScalarWhereWithAggregatesInput[]
    OR?: sessioniScalarWhereWithAggregatesInput[]
    NOT?: sessioniScalarWhereWithAggregatesInput | sessioniScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"sessioni"> | number
    id_cittadino?: IntWithAggregatesFilter<"sessioni"> | number
  }

  export type spatial_ref_sysWhereInput = {
    AND?: spatial_ref_sysWhereInput | spatial_ref_sysWhereInput[]
    OR?: spatial_ref_sysWhereInput[]
    NOT?: spatial_ref_sysWhereInput | spatial_ref_sysWhereInput[]
    srid?: IntFilter<"spatial_ref_sys"> | number
    auth_name?: StringNullableFilter<"spatial_ref_sys"> | string | null
    auth_srid?: IntNullableFilter<"spatial_ref_sys"> | number | null
    srtext?: StringNullableFilter<"spatial_ref_sys"> | string | null
    proj4text?: StringNullableFilter<"spatial_ref_sys"> | string | null
  }

  export type spatial_ref_sysOrderByWithRelationInput = {
    srid?: SortOrder
    auth_name?: SortOrderInput | SortOrder
    auth_srid?: SortOrderInput | SortOrder
    srtext?: SortOrderInput | SortOrder
    proj4text?: SortOrderInput | SortOrder
  }

  export type spatial_ref_sysWhereUniqueInput = Prisma.AtLeast<{
    srid?: number
    AND?: spatial_ref_sysWhereInput | spatial_ref_sysWhereInput[]
    OR?: spatial_ref_sysWhereInput[]
    NOT?: spatial_ref_sysWhereInput | spatial_ref_sysWhereInput[]
    auth_name?: StringNullableFilter<"spatial_ref_sys"> | string | null
    auth_srid?: IntNullableFilter<"spatial_ref_sys"> | number | null
    srtext?: StringNullableFilter<"spatial_ref_sys"> | string | null
    proj4text?: StringNullableFilter<"spatial_ref_sys"> | string | null
  }, "srid">

  export type spatial_ref_sysOrderByWithAggregationInput = {
    srid?: SortOrder
    auth_name?: SortOrderInput | SortOrder
    auth_srid?: SortOrderInput | SortOrder
    srtext?: SortOrderInput | SortOrder
    proj4text?: SortOrderInput | SortOrder
    _count?: spatial_ref_sysCountOrderByAggregateInput
    _avg?: spatial_ref_sysAvgOrderByAggregateInput
    _max?: spatial_ref_sysMaxOrderByAggregateInput
    _min?: spatial_ref_sysMinOrderByAggregateInput
    _sum?: spatial_ref_sysSumOrderByAggregateInput
  }

  export type spatial_ref_sysScalarWhereWithAggregatesInput = {
    AND?: spatial_ref_sysScalarWhereWithAggregatesInput | spatial_ref_sysScalarWhereWithAggregatesInput[]
    OR?: spatial_ref_sysScalarWhereWithAggregatesInput[]
    NOT?: spatial_ref_sysScalarWhereWithAggregatesInput | spatial_ref_sysScalarWhereWithAggregatesInput[]
    srid?: IntWithAggregatesFilter<"spatial_ref_sys"> | number
    auth_name?: StringNullableWithAggregatesFilter<"spatial_ref_sys"> | string | null
    auth_srid?: IntNullableWithAggregatesFilter<"spatial_ref_sys"> | number | null
    srtext?: StringNullableWithAggregatesFilter<"spatial_ref_sys"> | string | null
    proj4text?: StringNullableWithAggregatesFilter<"spatial_ref_sys"> | string | null
  }

  export type vettureWhereInput = {
    AND?: vettureWhereInput | vettureWhereInput[]
    OR?: vettureWhereInput[]
    NOT?: vettureWhereInput | vettureWhereInput[]
    id?: IntFilter<"vetture"> | number
    nome?: StringFilter<"vetture"> | string
    euro?: IntFilter<"vetture"> | number
    vin?: StringFilter<"vetture"> | string
    propriet_?: Propriet_ListRelationFilter
  }

  export type vettureOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    euro?: SortOrder
    vin?: SortOrder
    propriet_?: propriet_OrderByRelationAggregateInput
  }

  export type vettureWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: vettureWhereInput | vettureWhereInput[]
    OR?: vettureWhereInput[]
    NOT?: vettureWhereInput | vettureWhereInput[]
    nome?: StringFilter<"vetture"> | string
    euro?: IntFilter<"vetture"> | number
    vin?: StringFilter<"vetture"> | string
    propriet_?: Propriet_ListRelationFilter
  }, "id">

  export type vettureOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    euro?: SortOrder
    vin?: SortOrder
    _count?: vettureCountOrderByAggregateInput
    _avg?: vettureAvgOrderByAggregateInput
    _max?: vettureMaxOrderByAggregateInput
    _min?: vettureMinOrderByAggregateInput
    _sum?: vettureSumOrderByAggregateInput
  }

  export type vettureScalarWhereWithAggregatesInput = {
    AND?: vettureScalarWhereWithAggregatesInput | vettureScalarWhereWithAggregatesInput[]
    OR?: vettureScalarWhereWithAggregatesInput[]
    NOT?: vettureScalarWhereWithAggregatesInput | vettureScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"vetture"> | number
    nome?: StringWithAggregatesFilter<"vetture"> | string
    euro?: IntWithAggregatesFilter<"vetture"> | number
    vin?: StringWithAggregatesFilter<"vetture"> | string
  }

  export type areaCreateInput = {
    comuni: comuniCreateNestedOneWithoutAreaInput
    ecoscores?: ecoscoresCreateNestedManyWithoutAreaInput
  }

  export type areaUncheckedCreateInput = {
    id?: number
    id_comune: number
    ecoscores?: ecoscoresUncheckedCreateNestedManyWithoutAreaInput
  }

  export type areaUpdateInput = {
    comuni?: comuniUpdateOneRequiredWithoutAreaNestedInput
    ecoscores?: ecoscoresUpdateManyWithoutAreaNestedInput
  }

  export type areaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_comune?: IntFieldUpdateOperationsInput | number
    ecoscores?: ecoscoresUncheckedUpdateManyWithoutAreaNestedInput
  }

  export type areaCreateManyInput = {
    id?: number
    id_comune: number
  }

  export type areaUpdateManyMutationInput = {

  }

  export type areaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_comune?: IntFieldUpdateOperationsInput | number
  }

  export type cittadiniCreateInput = {
    nome?: string | null
    email?: string | null
    data_nascita?: Date | string | null
    password: string
    propriet_?: propriet_CreateNestedManyWithoutCittadiniInput
    sessioni?: sessioniCreateNestedManyWithoutCittadiniInput
  }

  export type cittadiniUncheckedCreateInput = {
    id?: number
    nome?: string | null
    email?: string | null
    data_nascita?: Date | string | null
    password: string
    propriet_?: propriet_UncheckedCreateNestedManyWithoutCittadiniInput
    sessioni?: sessioniUncheckedCreateNestedManyWithoutCittadiniInput
  }

  export type cittadiniUpdateInput = {
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    data_nascita?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    propriet_?: propriet_UpdateManyWithoutCittadiniNestedInput
    sessioni?: sessioniUpdateManyWithoutCittadiniNestedInput
  }

  export type cittadiniUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    data_nascita?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    propriet_?: propriet_UncheckedUpdateManyWithoutCittadiniNestedInput
    sessioni?: sessioniUncheckedUpdateManyWithoutCittadiniNestedInput
  }

  export type cittadiniCreateManyInput = {
    id?: number
    nome?: string | null
    email?: string | null
    data_nascita?: Date | string | null
    password: string
  }

  export type cittadiniUpdateManyMutationInput = {
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    data_nascita?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
  }

  export type cittadiniUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    data_nascita?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
  }

  export type comuniCreateInput = {
    nome: string
    provincia: string
    regione: string
    email?: string | null
    password: string
    area?: areaCreateNestedManyWithoutComuniInput
  }

  export type comuniUncheckedCreateInput = {
    id?: number
    nome: string
    provincia: string
    regione: string
    email?: string | null
    password: string
    area?: areaUncheckedCreateNestedManyWithoutComuniInput
  }

  export type comuniUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    provincia?: StringFieldUpdateOperationsInput | string
    regione?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    area?: areaUpdateManyWithoutComuniNestedInput
  }

  export type comuniUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    provincia?: StringFieldUpdateOperationsInput | string
    regione?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    area?: areaUncheckedUpdateManyWithoutComuniNestedInput
  }

  export type comuniCreateManyInput = {
    id?: number
    nome: string
    provincia: string
    regione: string
    email?: string | null
    password: string
  }

  export type comuniUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    provincia?: StringFieldUpdateOperationsInput | string
    regione?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
  }

  export type comuniUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    provincia?: StringFieldUpdateOperationsInput | string
    regione?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
  }

  export type ecoscoresCreateInput = {
    punteggio?: number | null
    area?: areaCreateNestedOneWithoutEcoscoresInput
    sessioni: sessioniCreateNestedOneWithoutEcoscoresInput
  }

  export type ecoscoresUncheckedCreateInput = {
    id?: number
    punteggio?: number | null
    id_area?: number
    id_sessione: number
  }

  export type ecoscoresUpdateInput = {
    punteggio?: NullableFloatFieldUpdateOperationsInput | number | null
    area?: areaUpdateOneRequiredWithoutEcoscoresNestedInput
    sessioni?: sessioniUpdateOneRequiredWithoutEcoscoresNestedInput
  }

  export type ecoscoresUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    punteggio?: NullableFloatFieldUpdateOperationsInput | number | null
    id_area?: IntFieldUpdateOperationsInput | number
    id_sessione?: IntFieldUpdateOperationsInput | number
  }

  export type ecoscoresCreateManyInput = {
    id?: number
    punteggio?: number | null
    id_area?: number
    id_sessione: number
  }

  export type ecoscoresUpdateManyMutationInput = {
    punteggio?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type ecoscoresUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    punteggio?: NullableFloatFieldUpdateOperationsInput | number | null
    id_area?: IntFieldUpdateOperationsInput | number
    id_sessione?: IntFieldUpdateOperationsInput | number
  }

  export type propriet_CreateInput = {
    cittadini: cittadiniCreateNestedOneWithoutPropriet_Input
    vetture: vettureCreateNestedOneWithoutPropriet_Input
  }

  export type propriet_UncheckedCreateInput = {
    id?: number
    id_cittadino: number
    id_vettura: number
  }

  export type propriet_UpdateInput = {
    cittadini?: cittadiniUpdateOneRequiredWithoutPropriet_NestedInput
    vetture?: vettureUpdateOneRequiredWithoutPropriet_NestedInput
  }

  export type propriet_UncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_cittadino?: IntFieldUpdateOperationsInput | number
    id_vettura?: IntFieldUpdateOperationsInput | number
  }

  export type propriet_CreateManyInput = {
    id?: number
    id_cittadino: number
    id_vettura: number
  }

  export type propriet_UpdateManyMutationInput = {

  }

  export type propriet_UncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_cittadino?: IntFieldUpdateOperationsInput | number
    id_vettura?: IntFieldUpdateOperationsInput | number
  }

  export type sessioniCreateInput = {
    ecoscores?: ecoscoresCreateNestedManyWithoutSessioniInput
    cittadini: cittadiniCreateNestedOneWithoutSessioniInput
  }

  export type sessioniUncheckedCreateInput = {
    id?: number
    id_cittadino: number
    ecoscores?: ecoscoresUncheckedCreateNestedManyWithoutSessioniInput
  }

  export type sessioniUpdateInput = {
    ecoscores?: ecoscoresUpdateManyWithoutSessioniNestedInput
    cittadini?: cittadiniUpdateOneRequiredWithoutSessioniNestedInput
  }

  export type sessioniUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_cittadino?: IntFieldUpdateOperationsInput | number
    ecoscores?: ecoscoresUncheckedUpdateManyWithoutSessioniNestedInput
  }

  export type sessioniCreateManyInput = {
    id?: number
    id_cittadino: number
  }

  export type sessioniUpdateManyMutationInput = {

  }

  export type sessioniUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_cittadino?: IntFieldUpdateOperationsInput | number
  }

  export type spatial_ref_sysCreateInput = {
    srid: number
    auth_name?: string | null
    auth_srid?: number | null
    srtext?: string | null
    proj4text?: string | null
  }

  export type spatial_ref_sysUncheckedCreateInput = {
    srid: number
    auth_name?: string | null
    auth_srid?: number | null
    srtext?: string | null
    proj4text?: string | null
  }

  export type spatial_ref_sysUpdateInput = {
    srid?: IntFieldUpdateOperationsInput | number
    auth_name?: NullableStringFieldUpdateOperationsInput | string | null
    auth_srid?: NullableIntFieldUpdateOperationsInput | number | null
    srtext?: NullableStringFieldUpdateOperationsInput | string | null
    proj4text?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type spatial_ref_sysUncheckedUpdateInput = {
    srid?: IntFieldUpdateOperationsInput | number
    auth_name?: NullableStringFieldUpdateOperationsInput | string | null
    auth_srid?: NullableIntFieldUpdateOperationsInput | number | null
    srtext?: NullableStringFieldUpdateOperationsInput | string | null
    proj4text?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type spatial_ref_sysCreateManyInput = {
    srid: number
    auth_name?: string | null
    auth_srid?: number | null
    srtext?: string | null
    proj4text?: string | null
  }

  export type spatial_ref_sysUpdateManyMutationInput = {
    srid?: IntFieldUpdateOperationsInput | number
    auth_name?: NullableStringFieldUpdateOperationsInput | string | null
    auth_srid?: NullableIntFieldUpdateOperationsInput | number | null
    srtext?: NullableStringFieldUpdateOperationsInput | string | null
    proj4text?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type spatial_ref_sysUncheckedUpdateManyInput = {
    srid?: IntFieldUpdateOperationsInput | number
    auth_name?: NullableStringFieldUpdateOperationsInput | string | null
    auth_srid?: NullableIntFieldUpdateOperationsInput | number | null
    srtext?: NullableStringFieldUpdateOperationsInput | string | null
    proj4text?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type vettureCreateInput = {
    nome: string
    euro: number
    vin: string
    propriet_?: propriet_CreateNestedManyWithoutVettureInput
  }

  export type vettureUncheckedCreateInput = {
    id?: number
    nome: string
    euro: number
    vin: string
    propriet_?: propriet_UncheckedCreateNestedManyWithoutVettureInput
  }

  export type vettureUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    euro?: IntFieldUpdateOperationsInput | number
    vin?: StringFieldUpdateOperationsInput | string
    propriet_?: propriet_UpdateManyWithoutVettureNestedInput
  }

  export type vettureUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    euro?: IntFieldUpdateOperationsInput | number
    vin?: StringFieldUpdateOperationsInput | string
    propriet_?: propriet_UncheckedUpdateManyWithoutVettureNestedInput
  }

  export type vettureCreateManyInput = {
    id?: number
    nome: string
    euro: number
    vin: string
  }

  export type vettureUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    euro?: IntFieldUpdateOperationsInput | number
    vin?: StringFieldUpdateOperationsInput | string
  }

  export type vettureUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    euro?: IntFieldUpdateOperationsInput | number
    vin?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ComuniScalarRelationFilter = {
    is?: comuniWhereInput
    isNot?: comuniWhereInput
  }

  export type EcoscoresListRelationFilter = {
    every?: ecoscoresWhereInput
    some?: ecoscoresWhereInput
    none?: ecoscoresWhereInput
  }

  export type ecoscoresOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type areaCountOrderByAggregateInput = {
    id?: SortOrder
    id_comune?: SortOrder
  }

  export type areaAvgOrderByAggregateInput = {
    id?: SortOrder
    id_comune?: SortOrder
  }

  export type areaMaxOrderByAggregateInput = {
    id?: SortOrder
    id_comune?: SortOrder
  }

  export type areaMinOrderByAggregateInput = {
    id?: SortOrder
    id_comune?: SortOrder
  }

  export type areaSumOrderByAggregateInput = {
    id?: SortOrder
    id_comune?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type Propriet_ListRelationFilter = {
    every?: propriet_WhereInput
    some?: propriet_WhereInput
    none?: propriet_WhereInput
  }

  export type SessioniListRelationFilter = {
    every?: sessioniWhereInput
    some?: sessioniWhereInput
    none?: sessioniWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type propriet_OrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type sessioniOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type cittadiniCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    data_nascita?: SortOrder
    password?: SortOrder
  }

  export type cittadiniAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type cittadiniMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    data_nascita?: SortOrder
    password?: SortOrder
  }

  export type cittadiniMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    data_nascita?: SortOrder
    password?: SortOrder
  }

  export type cittadiniSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type AreaListRelationFilter = {
    every?: areaWhereInput
    some?: areaWhereInput
    none?: areaWhereInput
  }

  export type areaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type comuniCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    provincia?: SortOrder
    regione?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type comuniAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type comuniMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    provincia?: SortOrder
    regione?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type comuniMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    provincia?: SortOrder
    regione?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type comuniSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type AreaScalarRelationFilter = {
    is?: areaWhereInput
    isNot?: areaWhereInput
  }

  export type SessioniScalarRelationFilter = {
    is?: sessioniWhereInput
    isNot?: sessioniWhereInput
  }

  export type ecoscoresCountOrderByAggregateInput = {
    id?: SortOrder
    punteggio?: SortOrder
    id_area?: SortOrder
    id_sessione?: SortOrder
  }

  export type ecoscoresAvgOrderByAggregateInput = {
    id?: SortOrder
    punteggio?: SortOrder
    id_area?: SortOrder
    id_sessione?: SortOrder
  }

  export type ecoscoresMaxOrderByAggregateInput = {
    id?: SortOrder
    punteggio?: SortOrder
    id_area?: SortOrder
    id_sessione?: SortOrder
  }

  export type ecoscoresMinOrderByAggregateInput = {
    id?: SortOrder
    punteggio?: SortOrder
    id_area?: SortOrder
    id_sessione?: SortOrder
  }

  export type ecoscoresSumOrderByAggregateInput = {
    id?: SortOrder
    punteggio?: SortOrder
    id_area?: SortOrder
    id_sessione?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type CittadiniScalarRelationFilter = {
    is?: cittadiniWhereInput
    isNot?: cittadiniWhereInput
  }

  export type VettureScalarRelationFilter = {
    is?: vettureWhereInput
    isNot?: vettureWhereInput
  }

  export type propriet_CountOrderByAggregateInput = {
    id?: SortOrder
    id_cittadino?: SortOrder
    id_vettura?: SortOrder
  }

  export type propriet_AvgOrderByAggregateInput = {
    id?: SortOrder
    id_cittadino?: SortOrder
    id_vettura?: SortOrder
  }

  export type propriet_MaxOrderByAggregateInput = {
    id?: SortOrder
    id_cittadino?: SortOrder
    id_vettura?: SortOrder
  }

  export type propriet_MinOrderByAggregateInput = {
    id?: SortOrder
    id_cittadino?: SortOrder
    id_vettura?: SortOrder
  }

  export type propriet_SumOrderByAggregateInput = {
    id?: SortOrder
    id_cittadino?: SortOrder
    id_vettura?: SortOrder
  }

  export type sessioniCountOrderByAggregateInput = {
    id?: SortOrder
    id_cittadino?: SortOrder
  }

  export type sessioniAvgOrderByAggregateInput = {
    id?: SortOrder
    id_cittadino?: SortOrder
  }

  export type sessioniMaxOrderByAggregateInput = {
    id?: SortOrder
    id_cittadino?: SortOrder
  }

  export type sessioniMinOrderByAggregateInput = {
    id?: SortOrder
    id_cittadino?: SortOrder
  }

  export type sessioniSumOrderByAggregateInput = {
    id?: SortOrder
    id_cittadino?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type spatial_ref_sysCountOrderByAggregateInput = {
    srid?: SortOrder
    auth_name?: SortOrder
    auth_srid?: SortOrder
    srtext?: SortOrder
    proj4text?: SortOrder
  }

  export type spatial_ref_sysAvgOrderByAggregateInput = {
    srid?: SortOrder
    auth_srid?: SortOrder
  }

  export type spatial_ref_sysMaxOrderByAggregateInput = {
    srid?: SortOrder
    auth_name?: SortOrder
    auth_srid?: SortOrder
    srtext?: SortOrder
    proj4text?: SortOrder
  }

  export type spatial_ref_sysMinOrderByAggregateInput = {
    srid?: SortOrder
    auth_name?: SortOrder
    auth_srid?: SortOrder
    srtext?: SortOrder
    proj4text?: SortOrder
  }

  export type spatial_ref_sysSumOrderByAggregateInput = {
    srid?: SortOrder
    auth_srid?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type vettureCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    euro?: SortOrder
    vin?: SortOrder
  }

  export type vettureAvgOrderByAggregateInput = {
    id?: SortOrder
    euro?: SortOrder
  }

  export type vettureMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    euro?: SortOrder
    vin?: SortOrder
  }

  export type vettureMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    euro?: SortOrder
    vin?: SortOrder
  }

  export type vettureSumOrderByAggregateInput = {
    id?: SortOrder
    euro?: SortOrder
  }

  export type comuniCreateNestedOneWithoutAreaInput = {
    create?: XOR<comuniCreateWithoutAreaInput, comuniUncheckedCreateWithoutAreaInput>
    connectOrCreate?: comuniCreateOrConnectWithoutAreaInput
    connect?: comuniWhereUniqueInput
  }

  export type ecoscoresCreateNestedManyWithoutAreaInput = {
    create?: XOR<ecoscoresCreateWithoutAreaInput, ecoscoresUncheckedCreateWithoutAreaInput> | ecoscoresCreateWithoutAreaInput[] | ecoscoresUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: ecoscoresCreateOrConnectWithoutAreaInput | ecoscoresCreateOrConnectWithoutAreaInput[]
    createMany?: ecoscoresCreateManyAreaInputEnvelope
    connect?: ecoscoresWhereUniqueInput | ecoscoresWhereUniqueInput[]
  }

  export type ecoscoresUncheckedCreateNestedManyWithoutAreaInput = {
    create?: XOR<ecoscoresCreateWithoutAreaInput, ecoscoresUncheckedCreateWithoutAreaInput> | ecoscoresCreateWithoutAreaInput[] | ecoscoresUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: ecoscoresCreateOrConnectWithoutAreaInput | ecoscoresCreateOrConnectWithoutAreaInput[]
    createMany?: ecoscoresCreateManyAreaInputEnvelope
    connect?: ecoscoresWhereUniqueInput | ecoscoresWhereUniqueInput[]
  }

  export type comuniUpdateOneRequiredWithoutAreaNestedInput = {
    create?: XOR<comuniCreateWithoutAreaInput, comuniUncheckedCreateWithoutAreaInput>
    connectOrCreate?: comuniCreateOrConnectWithoutAreaInput
    upsert?: comuniUpsertWithoutAreaInput
    connect?: comuniWhereUniqueInput
    update?: XOR<XOR<comuniUpdateToOneWithWhereWithoutAreaInput, comuniUpdateWithoutAreaInput>, comuniUncheckedUpdateWithoutAreaInput>
  }

  export type ecoscoresUpdateManyWithoutAreaNestedInput = {
    create?: XOR<ecoscoresCreateWithoutAreaInput, ecoscoresUncheckedCreateWithoutAreaInput> | ecoscoresCreateWithoutAreaInput[] | ecoscoresUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: ecoscoresCreateOrConnectWithoutAreaInput | ecoscoresCreateOrConnectWithoutAreaInput[]
    upsert?: ecoscoresUpsertWithWhereUniqueWithoutAreaInput | ecoscoresUpsertWithWhereUniqueWithoutAreaInput[]
    createMany?: ecoscoresCreateManyAreaInputEnvelope
    set?: ecoscoresWhereUniqueInput | ecoscoresWhereUniqueInput[]
    disconnect?: ecoscoresWhereUniqueInput | ecoscoresWhereUniqueInput[]
    delete?: ecoscoresWhereUniqueInput | ecoscoresWhereUniqueInput[]
    connect?: ecoscoresWhereUniqueInput | ecoscoresWhereUniqueInput[]
    update?: ecoscoresUpdateWithWhereUniqueWithoutAreaInput | ecoscoresUpdateWithWhereUniqueWithoutAreaInput[]
    updateMany?: ecoscoresUpdateManyWithWhereWithoutAreaInput | ecoscoresUpdateManyWithWhereWithoutAreaInput[]
    deleteMany?: ecoscoresScalarWhereInput | ecoscoresScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ecoscoresUncheckedUpdateManyWithoutAreaNestedInput = {
    create?: XOR<ecoscoresCreateWithoutAreaInput, ecoscoresUncheckedCreateWithoutAreaInput> | ecoscoresCreateWithoutAreaInput[] | ecoscoresUncheckedCreateWithoutAreaInput[]
    connectOrCreate?: ecoscoresCreateOrConnectWithoutAreaInput | ecoscoresCreateOrConnectWithoutAreaInput[]
    upsert?: ecoscoresUpsertWithWhereUniqueWithoutAreaInput | ecoscoresUpsertWithWhereUniqueWithoutAreaInput[]
    createMany?: ecoscoresCreateManyAreaInputEnvelope
    set?: ecoscoresWhereUniqueInput | ecoscoresWhereUniqueInput[]
    disconnect?: ecoscoresWhereUniqueInput | ecoscoresWhereUniqueInput[]
    delete?: ecoscoresWhereUniqueInput | ecoscoresWhereUniqueInput[]
    connect?: ecoscoresWhereUniqueInput | ecoscoresWhereUniqueInput[]
    update?: ecoscoresUpdateWithWhereUniqueWithoutAreaInput | ecoscoresUpdateWithWhereUniqueWithoutAreaInput[]
    updateMany?: ecoscoresUpdateManyWithWhereWithoutAreaInput | ecoscoresUpdateManyWithWhereWithoutAreaInput[]
    deleteMany?: ecoscoresScalarWhereInput | ecoscoresScalarWhereInput[]
  }

  export type propriet_CreateNestedManyWithoutCittadiniInput = {
    create?: XOR<propriet_CreateWithoutCittadiniInput, propriet_UncheckedCreateWithoutCittadiniInput> | propriet_CreateWithoutCittadiniInput[] | propriet_UncheckedCreateWithoutCittadiniInput[]
    connectOrCreate?: propriet_CreateOrConnectWithoutCittadiniInput | propriet_CreateOrConnectWithoutCittadiniInput[]
    createMany?: propriet_CreateManyCittadiniInputEnvelope
    connect?: propriet_WhereUniqueInput | propriet_WhereUniqueInput[]
  }

  export type sessioniCreateNestedManyWithoutCittadiniInput = {
    create?: XOR<sessioniCreateWithoutCittadiniInput, sessioniUncheckedCreateWithoutCittadiniInput> | sessioniCreateWithoutCittadiniInput[] | sessioniUncheckedCreateWithoutCittadiniInput[]
    connectOrCreate?: sessioniCreateOrConnectWithoutCittadiniInput | sessioniCreateOrConnectWithoutCittadiniInput[]
    createMany?: sessioniCreateManyCittadiniInputEnvelope
    connect?: sessioniWhereUniqueInput | sessioniWhereUniqueInput[]
  }

  export type propriet_UncheckedCreateNestedManyWithoutCittadiniInput = {
    create?: XOR<propriet_CreateWithoutCittadiniInput, propriet_UncheckedCreateWithoutCittadiniInput> | propriet_CreateWithoutCittadiniInput[] | propriet_UncheckedCreateWithoutCittadiniInput[]
    connectOrCreate?: propriet_CreateOrConnectWithoutCittadiniInput | propriet_CreateOrConnectWithoutCittadiniInput[]
    createMany?: propriet_CreateManyCittadiniInputEnvelope
    connect?: propriet_WhereUniqueInput | propriet_WhereUniqueInput[]
  }

  export type sessioniUncheckedCreateNestedManyWithoutCittadiniInput = {
    create?: XOR<sessioniCreateWithoutCittadiniInput, sessioniUncheckedCreateWithoutCittadiniInput> | sessioniCreateWithoutCittadiniInput[] | sessioniUncheckedCreateWithoutCittadiniInput[]
    connectOrCreate?: sessioniCreateOrConnectWithoutCittadiniInput | sessioniCreateOrConnectWithoutCittadiniInput[]
    createMany?: sessioniCreateManyCittadiniInputEnvelope
    connect?: sessioniWhereUniqueInput | sessioniWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type propriet_UpdateManyWithoutCittadiniNestedInput = {
    create?: XOR<propriet_CreateWithoutCittadiniInput, propriet_UncheckedCreateWithoutCittadiniInput> | propriet_CreateWithoutCittadiniInput[] | propriet_UncheckedCreateWithoutCittadiniInput[]
    connectOrCreate?: propriet_CreateOrConnectWithoutCittadiniInput | propriet_CreateOrConnectWithoutCittadiniInput[]
    upsert?: propriet_UpsertWithWhereUniqueWithoutCittadiniInput | propriet_UpsertWithWhereUniqueWithoutCittadiniInput[]
    createMany?: propriet_CreateManyCittadiniInputEnvelope
    set?: propriet_WhereUniqueInput | propriet_WhereUniqueInput[]
    disconnect?: propriet_WhereUniqueInput | propriet_WhereUniqueInput[]
    delete?: propriet_WhereUniqueInput | propriet_WhereUniqueInput[]
    connect?: propriet_WhereUniqueInput | propriet_WhereUniqueInput[]
    update?: propriet_UpdateWithWhereUniqueWithoutCittadiniInput | propriet_UpdateWithWhereUniqueWithoutCittadiniInput[]
    updateMany?: propriet_UpdateManyWithWhereWithoutCittadiniInput | propriet_UpdateManyWithWhereWithoutCittadiniInput[]
    deleteMany?: propriet_ScalarWhereInput | propriet_ScalarWhereInput[]
  }

  export type sessioniUpdateManyWithoutCittadiniNestedInput = {
    create?: XOR<sessioniCreateWithoutCittadiniInput, sessioniUncheckedCreateWithoutCittadiniInput> | sessioniCreateWithoutCittadiniInput[] | sessioniUncheckedCreateWithoutCittadiniInput[]
    connectOrCreate?: sessioniCreateOrConnectWithoutCittadiniInput | sessioniCreateOrConnectWithoutCittadiniInput[]
    upsert?: sessioniUpsertWithWhereUniqueWithoutCittadiniInput | sessioniUpsertWithWhereUniqueWithoutCittadiniInput[]
    createMany?: sessioniCreateManyCittadiniInputEnvelope
    set?: sessioniWhereUniqueInput | sessioniWhereUniqueInput[]
    disconnect?: sessioniWhereUniqueInput | sessioniWhereUniqueInput[]
    delete?: sessioniWhereUniqueInput | sessioniWhereUniqueInput[]
    connect?: sessioniWhereUniqueInput | sessioniWhereUniqueInput[]
    update?: sessioniUpdateWithWhereUniqueWithoutCittadiniInput | sessioniUpdateWithWhereUniqueWithoutCittadiniInput[]
    updateMany?: sessioniUpdateManyWithWhereWithoutCittadiniInput | sessioniUpdateManyWithWhereWithoutCittadiniInput[]
    deleteMany?: sessioniScalarWhereInput | sessioniScalarWhereInput[]
  }

  export type propriet_UncheckedUpdateManyWithoutCittadiniNestedInput = {
    create?: XOR<propriet_CreateWithoutCittadiniInput, propriet_UncheckedCreateWithoutCittadiniInput> | propriet_CreateWithoutCittadiniInput[] | propriet_UncheckedCreateWithoutCittadiniInput[]
    connectOrCreate?: propriet_CreateOrConnectWithoutCittadiniInput | propriet_CreateOrConnectWithoutCittadiniInput[]
    upsert?: propriet_UpsertWithWhereUniqueWithoutCittadiniInput | propriet_UpsertWithWhereUniqueWithoutCittadiniInput[]
    createMany?: propriet_CreateManyCittadiniInputEnvelope
    set?: propriet_WhereUniqueInput | propriet_WhereUniqueInput[]
    disconnect?: propriet_WhereUniqueInput | propriet_WhereUniqueInput[]
    delete?: propriet_WhereUniqueInput | propriet_WhereUniqueInput[]
    connect?: propriet_WhereUniqueInput | propriet_WhereUniqueInput[]
    update?: propriet_UpdateWithWhereUniqueWithoutCittadiniInput | propriet_UpdateWithWhereUniqueWithoutCittadiniInput[]
    updateMany?: propriet_UpdateManyWithWhereWithoutCittadiniInput | propriet_UpdateManyWithWhereWithoutCittadiniInput[]
    deleteMany?: propriet_ScalarWhereInput | propriet_ScalarWhereInput[]
  }

  export type sessioniUncheckedUpdateManyWithoutCittadiniNestedInput = {
    create?: XOR<sessioniCreateWithoutCittadiniInput, sessioniUncheckedCreateWithoutCittadiniInput> | sessioniCreateWithoutCittadiniInput[] | sessioniUncheckedCreateWithoutCittadiniInput[]
    connectOrCreate?: sessioniCreateOrConnectWithoutCittadiniInput | sessioniCreateOrConnectWithoutCittadiniInput[]
    upsert?: sessioniUpsertWithWhereUniqueWithoutCittadiniInput | sessioniUpsertWithWhereUniqueWithoutCittadiniInput[]
    createMany?: sessioniCreateManyCittadiniInputEnvelope
    set?: sessioniWhereUniqueInput | sessioniWhereUniqueInput[]
    disconnect?: sessioniWhereUniqueInput | sessioniWhereUniqueInput[]
    delete?: sessioniWhereUniqueInput | sessioniWhereUniqueInput[]
    connect?: sessioniWhereUniqueInput | sessioniWhereUniqueInput[]
    update?: sessioniUpdateWithWhereUniqueWithoutCittadiniInput | sessioniUpdateWithWhereUniqueWithoutCittadiniInput[]
    updateMany?: sessioniUpdateManyWithWhereWithoutCittadiniInput | sessioniUpdateManyWithWhereWithoutCittadiniInput[]
    deleteMany?: sessioniScalarWhereInput | sessioniScalarWhereInput[]
  }

  export type areaCreateNestedManyWithoutComuniInput = {
    create?: XOR<areaCreateWithoutComuniInput, areaUncheckedCreateWithoutComuniInput> | areaCreateWithoutComuniInput[] | areaUncheckedCreateWithoutComuniInput[]
    connectOrCreate?: areaCreateOrConnectWithoutComuniInput | areaCreateOrConnectWithoutComuniInput[]
    createMany?: areaCreateManyComuniInputEnvelope
    connect?: areaWhereUniqueInput | areaWhereUniqueInput[]
  }

  export type areaUncheckedCreateNestedManyWithoutComuniInput = {
    create?: XOR<areaCreateWithoutComuniInput, areaUncheckedCreateWithoutComuniInput> | areaCreateWithoutComuniInput[] | areaUncheckedCreateWithoutComuniInput[]
    connectOrCreate?: areaCreateOrConnectWithoutComuniInput | areaCreateOrConnectWithoutComuniInput[]
    createMany?: areaCreateManyComuniInputEnvelope
    connect?: areaWhereUniqueInput | areaWhereUniqueInput[]
  }

  export type areaUpdateManyWithoutComuniNestedInput = {
    create?: XOR<areaCreateWithoutComuniInput, areaUncheckedCreateWithoutComuniInput> | areaCreateWithoutComuniInput[] | areaUncheckedCreateWithoutComuniInput[]
    connectOrCreate?: areaCreateOrConnectWithoutComuniInput | areaCreateOrConnectWithoutComuniInput[]
    upsert?: areaUpsertWithWhereUniqueWithoutComuniInput | areaUpsertWithWhereUniqueWithoutComuniInput[]
    createMany?: areaCreateManyComuniInputEnvelope
    set?: areaWhereUniqueInput | areaWhereUniqueInput[]
    disconnect?: areaWhereUniqueInput | areaWhereUniqueInput[]
    delete?: areaWhereUniqueInput | areaWhereUniqueInput[]
    connect?: areaWhereUniqueInput | areaWhereUniqueInput[]
    update?: areaUpdateWithWhereUniqueWithoutComuniInput | areaUpdateWithWhereUniqueWithoutComuniInput[]
    updateMany?: areaUpdateManyWithWhereWithoutComuniInput | areaUpdateManyWithWhereWithoutComuniInput[]
    deleteMany?: areaScalarWhereInput | areaScalarWhereInput[]
  }

  export type areaUncheckedUpdateManyWithoutComuniNestedInput = {
    create?: XOR<areaCreateWithoutComuniInput, areaUncheckedCreateWithoutComuniInput> | areaCreateWithoutComuniInput[] | areaUncheckedCreateWithoutComuniInput[]
    connectOrCreate?: areaCreateOrConnectWithoutComuniInput | areaCreateOrConnectWithoutComuniInput[]
    upsert?: areaUpsertWithWhereUniqueWithoutComuniInput | areaUpsertWithWhereUniqueWithoutComuniInput[]
    createMany?: areaCreateManyComuniInputEnvelope
    set?: areaWhereUniqueInput | areaWhereUniqueInput[]
    disconnect?: areaWhereUniqueInput | areaWhereUniqueInput[]
    delete?: areaWhereUniqueInput | areaWhereUniqueInput[]
    connect?: areaWhereUniqueInput | areaWhereUniqueInput[]
    update?: areaUpdateWithWhereUniqueWithoutComuniInput | areaUpdateWithWhereUniqueWithoutComuniInput[]
    updateMany?: areaUpdateManyWithWhereWithoutComuniInput | areaUpdateManyWithWhereWithoutComuniInput[]
    deleteMany?: areaScalarWhereInput | areaScalarWhereInput[]
  }

  export type areaCreateNestedOneWithoutEcoscoresInput = {
    create?: XOR<areaCreateWithoutEcoscoresInput, areaUncheckedCreateWithoutEcoscoresInput>
    connectOrCreate?: areaCreateOrConnectWithoutEcoscoresInput
    connect?: areaWhereUniqueInput
  }

  export type sessioniCreateNestedOneWithoutEcoscoresInput = {
    create?: XOR<sessioniCreateWithoutEcoscoresInput, sessioniUncheckedCreateWithoutEcoscoresInput>
    connectOrCreate?: sessioniCreateOrConnectWithoutEcoscoresInput
    connect?: sessioniWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type areaUpdateOneRequiredWithoutEcoscoresNestedInput = {
    create?: XOR<areaCreateWithoutEcoscoresInput, areaUncheckedCreateWithoutEcoscoresInput>
    connectOrCreate?: areaCreateOrConnectWithoutEcoscoresInput
    upsert?: areaUpsertWithoutEcoscoresInput
    connect?: areaWhereUniqueInput
    update?: XOR<XOR<areaUpdateToOneWithWhereWithoutEcoscoresInput, areaUpdateWithoutEcoscoresInput>, areaUncheckedUpdateWithoutEcoscoresInput>
  }

  export type sessioniUpdateOneRequiredWithoutEcoscoresNestedInput = {
    create?: XOR<sessioniCreateWithoutEcoscoresInput, sessioniUncheckedCreateWithoutEcoscoresInput>
    connectOrCreate?: sessioniCreateOrConnectWithoutEcoscoresInput
    upsert?: sessioniUpsertWithoutEcoscoresInput
    connect?: sessioniWhereUniqueInput
    update?: XOR<XOR<sessioniUpdateToOneWithWhereWithoutEcoscoresInput, sessioniUpdateWithoutEcoscoresInput>, sessioniUncheckedUpdateWithoutEcoscoresInput>
  }

  export type cittadiniCreateNestedOneWithoutPropriet_Input = {
    create?: XOR<cittadiniCreateWithoutPropriet_Input, cittadiniUncheckedCreateWithoutPropriet_Input>
    connectOrCreate?: cittadiniCreateOrConnectWithoutPropriet_Input
    connect?: cittadiniWhereUniqueInput
  }

  export type vettureCreateNestedOneWithoutPropriet_Input = {
    create?: XOR<vettureCreateWithoutPropriet_Input, vettureUncheckedCreateWithoutPropriet_Input>
    connectOrCreate?: vettureCreateOrConnectWithoutPropriet_Input
    connect?: vettureWhereUniqueInput
  }

  export type cittadiniUpdateOneRequiredWithoutPropriet_NestedInput = {
    create?: XOR<cittadiniCreateWithoutPropriet_Input, cittadiniUncheckedCreateWithoutPropriet_Input>
    connectOrCreate?: cittadiniCreateOrConnectWithoutPropriet_Input
    upsert?: cittadiniUpsertWithoutPropriet_Input
    connect?: cittadiniWhereUniqueInput
    update?: XOR<XOR<cittadiniUpdateToOneWithWhereWithoutPropriet_Input, cittadiniUpdateWithoutPropriet_Input>, cittadiniUncheckedUpdateWithoutPropriet_Input>
  }

  export type vettureUpdateOneRequiredWithoutPropriet_NestedInput = {
    create?: XOR<vettureCreateWithoutPropriet_Input, vettureUncheckedCreateWithoutPropriet_Input>
    connectOrCreate?: vettureCreateOrConnectWithoutPropriet_Input
    upsert?: vettureUpsertWithoutPropriet_Input
    connect?: vettureWhereUniqueInput
    update?: XOR<XOR<vettureUpdateToOneWithWhereWithoutPropriet_Input, vettureUpdateWithoutPropriet_Input>, vettureUncheckedUpdateWithoutPropriet_Input>
  }

  export type ecoscoresCreateNestedManyWithoutSessioniInput = {
    create?: XOR<ecoscoresCreateWithoutSessioniInput, ecoscoresUncheckedCreateWithoutSessioniInput> | ecoscoresCreateWithoutSessioniInput[] | ecoscoresUncheckedCreateWithoutSessioniInput[]
    connectOrCreate?: ecoscoresCreateOrConnectWithoutSessioniInput | ecoscoresCreateOrConnectWithoutSessioniInput[]
    createMany?: ecoscoresCreateManySessioniInputEnvelope
    connect?: ecoscoresWhereUniqueInput | ecoscoresWhereUniqueInput[]
  }

  export type cittadiniCreateNestedOneWithoutSessioniInput = {
    create?: XOR<cittadiniCreateWithoutSessioniInput, cittadiniUncheckedCreateWithoutSessioniInput>
    connectOrCreate?: cittadiniCreateOrConnectWithoutSessioniInput
    connect?: cittadiniWhereUniqueInput
  }

  export type ecoscoresUncheckedCreateNestedManyWithoutSessioniInput = {
    create?: XOR<ecoscoresCreateWithoutSessioniInput, ecoscoresUncheckedCreateWithoutSessioniInput> | ecoscoresCreateWithoutSessioniInput[] | ecoscoresUncheckedCreateWithoutSessioniInput[]
    connectOrCreate?: ecoscoresCreateOrConnectWithoutSessioniInput | ecoscoresCreateOrConnectWithoutSessioniInput[]
    createMany?: ecoscoresCreateManySessioniInputEnvelope
    connect?: ecoscoresWhereUniqueInput | ecoscoresWhereUniqueInput[]
  }

  export type ecoscoresUpdateManyWithoutSessioniNestedInput = {
    create?: XOR<ecoscoresCreateWithoutSessioniInput, ecoscoresUncheckedCreateWithoutSessioniInput> | ecoscoresCreateWithoutSessioniInput[] | ecoscoresUncheckedCreateWithoutSessioniInput[]
    connectOrCreate?: ecoscoresCreateOrConnectWithoutSessioniInput | ecoscoresCreateOrConnectWithoutSessioniInput[]
    upsert?: ecoscoresUpsertWithWhereUniqueWithoutSessioniInput | ecoscoresUpsertWithWhereUniqueWithoutSessioniInput[]
    createMany?: ecoscoresCreateManySessioniInputEnvelope
    set?: ecoscoresWhereUniqueInput | ecoscoresWhereUniqueInput[]
    disconnect?: ecoscoresWhereUniqueInput | ecoscoresWhereUniqueInput[]
    delete?: ecoscoresWhereUniqueInput | ecoscoresWhereUniqueInput[]
    connect?: ecoscoresWhereUniqueInput | ecoscoresWhereUniqueInput[]
    update?: ecoscoresUpdateWithWhereUniqueWithoutSessioniInput | ecoscoresUpdateWithWhereUniqueWithoutSessioniInput[]
    updateMany?: ecoscoresUpdateManyWithWhereWithoutSessioniInput | ecoscoresUpdateManyWithWhereWithoutSessioniInput[]
    deleteMany?: ecoscoresScalarWhereInput | ecoscoresScalarWhereInput[]
  }

  export type cittadiniUpdateOneRequiredWithoutSessioniNestedInput = {
    create?: XOR<cittadiniCreateWithoutSessioniInput, cittadiniUncheckedCreateWithoutSessioniInput>
    connectOrCreate?: cittadiniCreateOrConnectWithoutSessioniInput
    upsert?: cittadiniUpsertWithoutSessioniInput
    connect?: cittadiniWhereUniqueInput
    update?: XOR<XOR<cittadiniUpdateToOneWithWhereWithoutSessioniInput, cittadiniUpdateWithoutSessioniInput>, cittadiniUncheckedUpdateWithoutSessioniInput>
  }

  export type ecoscoresUncheckedUpdateManyWithoutSessioniNestedInput = {
    create?: XOR<ecoscoresCreateWithoutSessioniInput, ecoscoresUncheckedCreateWithoutSessioniInput> | ecoscoresCreateWithoutSessioniInput[] | ecoscoresUncheckedCreateWithoutSessioniInput[]
    connectOrCreate?: ecoscoresCreateOrConnectWithoutSessioniInput | ecoscoresCreateOrConnectWithoutSessioniInput[]
    upsert?: ecoscoresUpsertWithWhereUniqueWithoutSessioniInput | ecoscoresUpsertWithWhereUniqueWithoutSessioniInput[]
    createMany?: ecoscoresCreateManySessioniInputEnvelope
    set?: ecoscoresWhereUniqueInput | ecoscoresWhereUniqueInput[]
    disconnect?: ecoscoresWhereUniqueInput | ecoscoresWhereUniqueInput[]
    delete?: ecoscoresWhereUniqueInput | ecoscoresWhereUniqueInput[]
    connect?: ecoscoresWhereUniqueInput | ecoscoresWhereUniqueInput[]
    update?: ecoscoresUpdateWithWhereUniqueWithoutSessioniInput | ecoscoresUpdateWithWhereUniqueWithoutSessioniInput[]
    updateMany?: ecoscoresUpdateManyWithWhereWithoutSessioniInput | ecoscoresUpdateManyWithWhereWithoutSessioniInput[]
    deleteMany?: ecoscoresScalarWhereInput | ecoscoresScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type propriet_CreateNestedManyWithoutVettureInput = {
    create?: XOR<propriet_CreateWithoutVettureInput, propriet_UncheckedCreateWithoutVettureInput> | propriet_CreateWithoutVettureInput[] | propriet_UncheckedCreateWithoutVettureInput[]
    connectOrCreate?: propriet_CreateOrConnectWithoutVettureInput | propriet_CreateOrConnectWithoutVettureInput[]
    createMany?: propriet_CreateManyVettureInputEnvelope
    connect?: propriet_WhereUniqueInput | propriet_WhereUniqueInput[]
  }

  export type propriet_UncheckedCreateNestedManyWithoutVettureInput = {
    create?: XOR<propriet_CreateWithoutVettureInput, propriet_UncheckedCreateWithoutVettureInput> | propriet_CreateWithoutVettureInput[] | propriet_UncheckedCreateWithoutVettureInput[]
    connectOrCreate?: propriet_CreateOrConnectWithoutVettureInput | propriet_CreateOrConnectWithoutVettureInput[]
    createMany?: propriet_CreateManyVettureInputEnvelope
    connect?: propriet_WhereUniqueInput | propriet_WhereUniqueInput[]
  }

  export type propriet_UpdateManyWithoutVettureNestedInput = {
    create?: XOR<propriet_CreateWithoutVettureInput, propriet_UncheckedCreateWithoutVettureInput> | propriet_CreateWithoutVettureInput[] | propriet_UncheckedCreateWithoutVettureInput[]
    connectOrCreate?: propriet_CreateOrConnectWithoutVettureInput | propriet_CreateOrConnectWithoutVettureInput[]
    upsert?: propriet_UpsertWithWhereUniqueWithoutVettureInput | propriet_UpsertWithWhereUniqueWithoutVettureInput[]
    createMany?: propriet_CreateManyVettureInputEnvelope
    set?: propriet_WhereUniqueInput | propriet_WhereUniqueInput[]
    disconnect?: propriet_WhereUniqueInput | propriet_WhereUniqueInput[]
    delete?: propriet_WhereUniqueInput | propriet_WhereUniqueInput[]
    connect?: propriet_WhereUniqueInput | propriet_WhereUniqueInput[]
    update?: propriet_UpdateWithWhereUniqueWithoutVettureInput | propriet_UpdateWithWhereUniqueWithoutVettureInput[]
    updateMany?: propriet_UpdateManyWithWhereWithoutVettureInput | propriet_UpdateManyWithWhereWithoutVettureInput[]
    deleteMany?: propriet_ScalarWhereInput | propriet_ScalarWhereInput[]
  }

  export type propriet_UncheckedUpdateManyWithoutVettureNestedInput = {
    create?: XOR<propriet_CreateWithoutVettureInput, propriet_UncheckedCreateWithoutVettureInput> | propriet_CreateWithoutVettureInput[] | propriet_UncheckedCreateWithoutVettureInput[]
    connectOrCreate?: propriet_CreateOrConnectWithoutVettureInput | propriet_CreateOrConnectWithoutVettureInput[]
    upsert?: propriet_UpsertWithWhereUniqueWithoutVettureInput | propriet_UpsertWithWhereUniqueWithoutVettureInput[]
    createMany?: propriet_CreateManyVettureInputEnvelope
    set?: propriet_WhereUniqueInput | propriet_WhereUniqueInput[]
    disconnect?: propriet_WhereUniqueInput | propriet_WhereUniqueInput[]
    delete?: propriet_WhereUniqueInput | propriet_WhereUniqueInput[]
    connect?: propriet_WhereUniqueInput | propriet_WhereUniqueInput[]
    update?: propriet_UpdateWithWhereUniqueWithoutVettureInput | propriet_UpdateWithWhereUniqueWithoutVettureInput[]
    updateMany?: propriet_UpdateManyWithWhereWithoutVettureInput | propriet_UpdateManyWithWhereWithoutVettureInput[]
    deleteMany?: propriet_ScalarWhereInput | propriet_ScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type comuniCreateWithoutAreaInput = {
    nome: string
    provincia: string
    regione: string
    email?: string | null
    password: string
  }

  export type comuniUncheckedCreateWithoutAreaInput = {
    id?: number
    nome: string
    provincia: string
    regione: string
    email?: string | null
    password: string
  }

  export type comuniCreateOrConnectWithoutAreaInput = {
    where: comuniWhereUniqueInput
    create: XOR<comuniCreateWithoutAreaInput, comuniUncheckedCreateWithoutAreaInput>
  }

  export type ecoscoresCreateWithoutAreaInput = {
    punteggio?: number | null
    sessioni: sessioniCreateNestedOneWithoutEcoscoresInput
  }

  export type ecoscoresUncheckedCreateWithoutAreaInput = {
    id?: number
    punteggio?: number | null
    id_sessione: number
  }

  export type ecoscoresCreateOrConnectWithoutAreaInput = {
    where: ecoscoresWhereUniqueInput
    create: XOR<ecoscoresCreateWithoutAreaInput, ecoscoresUncheckedCreateWithoutAreaInput>
  }

  export type ecoscoresCreateManyAreaInputEnvelope = {
    data: ecoscoresCreateManyAreaInput | ecoscoresCreateManyAreaInput[]
    skipDuplicates?: boolean
  }

  export type comuniUpsertWithoutAreaInput = {
    update: XOR<comuniUpdateWithoutAreaInput, comuniUncheckedUpdateWithoutAreaInput>
    create: XOR<comuniCreateWithoutAreaInput, comuniUncheckedCreateWithoutAreaInput>
    where?: comuniWhereInput
  }

  export type comuniUpdateToOneWithWhereWithoutAreaInput = {
    where?: comuniWhereInput
    data: XOR<comuniUpdateWithoutAreaInput, comuniUncheckedUpdateWithoutAreaInput>
  }

  export type comuniUpdateWithoutAreaInput = {
    nome?: StringFieldUpdateOperationsInput | string
    provincia?: StringFieldUpdateOperationsInput | string
    regione?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
  }

  export type comuniUncheckedUpdateWithoutAreaInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    provincia?: StringFieldUpdateOperationsInput | string
    regione?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
  }

  export type ecoscoresUpsertWithWhereUniqueWithoutAreaInput = {
    where: ecoscoresWhereUniqueInput
    update: XOR<ecoscoresUpdateWithoutAreaInput, ecoscoresUncheckedUpdateWithoutAreaInput>
    create: XOR<ecoscoresCreateWithoutAreaInput, ecoscoresUncheckedCreateWithoutAreaInput>
  }

  export type ecoscoresUpdateWithWhereUniqueWithoutAreaInput = {
    where: ecoscoresWhereUniqueInput
    data: XOR<ecoscoresUpdateWithoutAreaInput, ecoscoresUncheckedUpdateWithoutAreaInput>
  }

  export type ecoscoresUpdateManyWithWhereWithoutAreaInput = {
    where: ecoscoresScalarWhereInput
    data: XOR<ecoscoresUpdateManyMutationInput, ecoscoresUncheckedUpdateManyWithoutAreaInput>
  }

  export type ecoscoresScalarWhereInput = {
    AND?: ecoscoresScalarWhereInput | ecoscoresScalarWhereInput[]
    OR?: ecoscoresScalarWhereInput[]
    NOT?: ecoscoresScalarWhereInput | ecoscoresScalarWhereInput[]
    id?: IntFilter<"ecoscores"> | number
    punteggio?: FloatNullableFilter<"ecoscores"> | number | null
    id_area?: IntFilter<"ecoscores"> | number
    id_sessione?: IntFilter<"ecoscores"> | number
  }

  export type propriet_CreateWithoutCittadiniInput = {
    vetture: vettureCreateNestedOneWithoutPropriet_Input
  }

  export type propriet_UncheckedCreateWithoutCittadiniInput = {
    id?: number
    id_vettura: number
  }

  export type propriet_CreateOrConnectWithoutCittadiniInput = {
    where: propriet_WhereUniqueInput
    create: XOR<propriet_CreateWithoutCittadiniInput, propriet_UncheckedCreateWithoutCittadiniInput>
  }

  export type propriet_CreateManyCittadiniInputEnvelope = {
    data: propriet_CreateManyCittadiniInput | propriet_CreateManyCittadiniInput[]
    skipDuplicates?: boolean
  }

  export type sessioniCreateWithoutCittadiniInput = {
    ecoscores?: ecoscoresCreateNestedManyWithoutSessioniInput
  }

  export type sessioniUncheckedCreateWithoutCittadiniInput = {
    id?: number
    ecoscores?: ecoscoresUncheckedCreateNestedManyWithoutSessioniInput
  }

  export type sessioniCreateOrConnectWithoutCittadiniInput = {
    where: sessioniWhereUniqueInput
    create: XOR<sessioniCreateWithoutCittadiniInput, sessioniUncheckedCreateWithoutCittadiniInput>
  }

  export type sessioniCreateManyCittadiniInputEnvelope = {
    data: sessioniCreateManyCittadiniInput | sessioniCreateManyCittadiniInput[]
    skipDuplicates?: boolean
  }

  export type propriet_UpsertWithWhereUniqueWithoutCittadiniInput = {
    where: propriet_WhereUniqueInput
    update: XOR<propriet_UpdateWithoutCittadiniInput, propriet_UncheckedUpdateWithoutCittadiniInput>
    create: XOR<propriet_CreateWithoutCittadiniInput, propriet_UncheckedCreateWithoutCittadiniInput>
  }

  export type propriet_UpdateWithWhereUniqueWithoutCittadiniInput = {
    where: propriet_WhereUniqueInput
    data: XOR<propriet_UpdateWithoutCittadiniInput, propriet_UncheckedUpdateWithoutCittadiniInput>
  }

  export type propriet_UpdateManyWithWhereWithoutCittadiniInput = {
    where: propriet_ScalarWhereInput
    data: XOR<propriet_UpdateManyMutationInput, propriet_UncheckedUpdateManyWithoutCittadiniInput>
  }

  export type propriet_ScalarWhereInput = {
    AND?: propriet_ScalarWhereInput | propriet_ScalarWhereInput[]
    OR?: propriet_ScalarWhereInput[]
    NOT?: propriet_ScalarWhereInput | propriet_ScalarWhereInput[]
    id?: IntFilter<"propriet_"> | number
    id_cittadino?: IntFilter<"propriet_"> | number
    id_vettura?: IntFilter<"propriet_"> | number
  }

  export type sessioniUpsertWithWhereUniqueWithoutCittadiniInput = {
    where: sessioniWhereUniqueInput
    update: XOR<sessioniUpdateWithoutCittadiniInput, sessioniUncheckedUpdateWithoutCittadiniInput>
    create: XOR<sessioniCreateWithoutCittadiniInput, sessioniUncheckedCreateWithoutCittadiniInput>
  }

  export type sessioniUpdateWithWhereUniqueWithoutCittadiniInput = {
    where: sessioniWhereUniqueInput
    data: XOR<sessioniUpdateWithoutCittadiniInput, sessioniUncheckedUpdateWithoutCittadiniInput>
  }

  export type sessioniUpdateManyWithWhereWithoutCittadiniInput = {
    where: sessioniScalarWhereInput
    data: XOR<sessioniUpdateManyMutationInput, sessioniUncheckedUpdateManyWithoutCittadiniInput>
  }

  export type sessioniScalarWhereInput = {
    AND?: sessioniScalarWhereInput | sessioniScalarWhereInput[]
    OR?: sessioniScalarWhereInput[]
    NOT?: sessioniScalarWhereInput | sessioniScalarWhereInput[]
    id?: IntFilter<"sessioni"> | number
    id_cittadino?: IntFilter<"sessioni"> | number
  }

  export type areaCreateWithoutComuniInput = {
    ecoscores?: ecoscoresCreateNestedManyWithoutAreaInput
  }

  export type areaUncheckedCreateWithoutComuniInput = {
    id?: number
    ecoscores?: ecoscoresUncheckedCreateNestedManyWithoutAreaInput
  }

  export type areaCreateOrConnectWithoutComuniInput = {
    where: areaWhereUniqueInput
    create: XOR<areaCreateWithoutComuniInput, areaUncheckedCreateWithoutComuniInput>
  }

  export type areaCreateManyComuniInputEnvelope = {
    data: areaCreateManyComuniInput | areaCreateManyComuniInput[]
    skipDuplicates?: boolean
  }

  export type areaUpsertWithWhereUniqueWithoutComuniInput = {
    where: areaWhereUniqueInput
    update: XOR<areaUpdateWithoutComuniInput, areaUncheckedUpdateWithoutComuniInput>
    create: XOR<areaCreateWithoutComuniInput, areaUncheckedCreateWithoutComuniInput>
  }

  export type areaUpdateWithWhereUniqueWithoutComuniInput = {
    where: areaWhereUniqueInput
    data: XOR<areaUpdateWithoutComuniInput, areaUncheckedUpdateWithoutComuniInput>
  }

  export type areaUpdateManyWithWhereWithoutComuniInput = {
    where: areaScalarWhereInput
    data: XOR<areaUpdateManyMutationInput, areaUncheckedUpdateManyWithoutComuniInput>
  }

  export type areaScalarWhereInput = {
    AND?: areaScalarWhereInput | areaScalarWhereInput[]
    OR?: areaScalarWhereInput[]
    NOT?: areaScalarWhereInput | areaScalarWhereInput[]
    id?: IntFilter<"area"> | number
    id_comune?: IntFilter<"area"> | number
  }

  export type areaCreateWithoutEcoscoresInput = {
    comuni: comuniCreateNestedOneWithoutAreaInput
  }

  export type areaUncheckedCreateWithoutEcoscoresInput = {
    id?: number
    id_comune: number
  }

  export type areaCreateOrConnectWithoutEcoscoresInput = {
    where: areaWhereUniqueInput
    create: XOR<areaCreateWithoutEcoscoresInput, areaUncheckedCreateWithoutEcoscoresInput>
  }

  export type sessioniCreateWithoutEcoscoresInput = {
    cittadini: cittadiniCreateNestedOneWithoutSessioniInput
  }

  export type sessioniUncheckedCreateWithoutEcoscoresInput = {
    id?: number
    id_cittadino: number
  }

  export type sessioniCreateOrConnectWithoutEcoscoresInput = {
    where: sessioniWhereUniqueInput
    create: XOR<sessioniCreateWithoutEcoscoresInput, sessioniUncheckedCreateWithoutEcoscoresInput>
  }

  export type areaUpsertWithoutEcoscoresInput = {
    update: XOR<areaUpdateWithoutEcoscoresInput, areaUncheckedUpdateWithoutEcoscoresInput>
    create: XOR<areaCreateWithoutEcoscoresInput, areaUncheckedCreateWithoutEcoscoresInput>
    where?: areaWhereInput
  }

  export type areaUpdateToOneWithWhereWithoutEcoscoresInput = {
    where?: areaWhereInput
    data: XOR<areaUpdateWithoutEcoscoresInput, areaUncheckedUpdateWithoutEcoscoresInput>
  }

  export type areaUpdateWithoutEcoscoresInput = {
    comuni?: comuniUpdateOneRequiredWithoutAreaNestedInput
  }

  export type areaUncheckedUpdateWithoutEcoscoresInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_comune?: IntFieldUpdateOperationsInput | number
  }

  export type sessioniUpsertWithoutEcoscoresInput = {
    update: XOR<sessioniUpdateWithoutEcoscoresInput, sessioniUncheckedUpdateWithoutEcoscoresInput>
    create: XOR<sessioniCreateWithoutEcoscoresInput, sessioniUncheckedCreateWithoutEcoscoresInput>
    where?: sessioniWhereInput
  }

  export type sessioniUpdateToOneWithWhereWithoutEcoscoresInput = {
    where?: sessioniWhereInput
    data: XOR<sessioniUpdateWithoutEcoscoresInput, sessioniUncheckedUpdateWithoutEcoscoresInput>
  }

  export type sessioniUpdateWithoutEcoscoresInput = {
    cittadini?: cittadiniUpdateOneRequiredWithoutSessioniNestedInput
  }

  export type sessioniUncheckedUpdateWithoutEcoscoresInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_cittadino?: IntFieldUpdateOperationsInput | number
  }

  export type cittadiniCreateWithoutPropriet_Input = {
    nome?: string | null
    email?: string | null
    data_nascita?: Date | string | null
    password: string
    sessioni?: sessioniCreateNestedManyWithoutCittadiniInput
  }

  export type cittadiniUncheckedCreateWithoutPropriet_Input = {
    id?: number
    nome?: string | null
    email?: string | null
    data_nascita?: Date | string | null
    password: string
    sessioni?: sessioniUncheckedCreateNestedManyWithoutCittadiniInput
  }

  export type cittadiniCreateOrConnectWithoutPropriet_Input = {
    where: cittadiniWhereUniqueInput
    create: XOR<cittadiniCreateWithoutPropriet_Input, cittadiniUncheckedCreateWithoutPropriet_Input>
  }

  export type vettureCreateWithoutPropriet_Input = {
    nome: string
    euro: number
    vin: string
  }

  export type vettureUncheckedCreateWithoutPropriet_Input = {
    id?: number
    nome: string
    euro: number
    vin: string
  }

  export type vettureCreateOrConnectWithoutPropriet_Input = {
    where: vettureWhereUniqueInput
    create: XOR<vettureCreateWithoutPropriet_Input, vettureUncheckedCreateWithoutPropriet_Input>
  }

  export type cittadiniUpsertWithoutPropriet_Input = {
    update: XOR<cittadiniUpdateWithoutPropriet_Input, cittadiniUncheckedUpdateWithoutPropriet_Input>
    create: XOR<cittadiniCreateWithoutPropriet_Input, cittadiniUncheckedCreateWithoutPropriet_Input>
    where?: cittadiniWhereInput
  }

  export type cittadiniUpdateToOneWithWhereWithoutPropriet_Input = {
    where?: cittadiniWhereInput
    data: XOR<cittadiniUpdateWithoutPropriet_Input, cittadiniUncheckedUpdateWithoutPropriet_Input>
  }

  export type cittadiniUpdateWithoutPropriet_Input = {
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    data_nascita?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    sessioni?: sessioniUpdateManyWithoutCittadiniNestedInput
  }

  export type cittadiniUncheckedUpdateWithoutPropriet_Input = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    data_nascita?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    sessioni?: sessioniUncheckedUpdateManyWithoutCittadiniNestedInput
  }

  export type vettureUpsertWithoutPropriet_Input = {
    update: XOR<vettureUpdateWithoutPropriet_Input, vettureUncheckedUpdateWithoutPropriet_Input>
    create: XOR<vettureCreateWithoutPropriet_Input, vettureUncheckedCreateWithoutPropriet_Input>
    where?: vettureWhereInput
  }

  export type vettureUpdateToOneWithWhereWithoutPropriet_Input = {
    where?: vettureWhereInput
    data: XOR<vettureUpdateWithoutPropriet_Input, vettureUncheckedUpdateWithoutPropriet_Input>
  }

  export type vettureUpdateWithoutPropriet_Input = {
    nome?: StringFieldUpdateOperationsInput | string
    euro?: IntFieldUpdateOperationsInput | number
    vin?: StringFieldUpdateOperationsInput | string
  }

  export type vettureUncheckedUpdateWithoutPropriet_Input = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    euro?: IntFieldUpdateOperationsInput | number
    vin?: StringFieldUpdateOperationsInput | string
  }

  export type ecoscoresCreateWithoutSessioniInput = {
    punteggio?: number | null
    area?: areaCreateNestedOneWithoutEcoscoresInput
  }

  export type ecoscoresUncheckedCreateWithoutSessioniInput = {
    id?: number
    punteggio?: number | null
    id_area?: number
  }

  export type ecoscoresCreateOrConnectWithoutSessioniInput = {
    where: ecoscoresWhereUniqueInput
    create: XOR<ecoscoresCreateWithoutSessioniInput, ecoscoresUncheckedCreateWithoutSessioniInput>
  }

  export type ecoscoresCreateManySessioniInputEnvelope = {
    data: ecoscoresCreateManySessioniInput | ecoscoresCreateManySessioniInput[]
    skipDuplicates?: boolean
  }

  export type cittadiniCreateWithoutSessioniInput = {
    nome?: string | null
    email?: string | null
    data_nascita?: Date | string | null
    password: string
    propriet_?: propriet_CreateNestedManyWithoutCittadiniInput
  }

  export type cittadiniUncheckedCreateWithoutSessioniInput = {
    id?: number
    nome?: string | null
    email?: string | null
    data_nascita?: Date | string | null
    password: string
    propriet_?: propriet_UncheckedCreateNestedManyWithoutCittadiniInput
  }

  export type cittadiniCreateOrConnectWithoutSessioniInput = {
    where: cittadiniWhereUniqueInput
    create: XOR<cittadiniCreateWithoutSessioniInput, cittadiniUncheckedCreateWithoutSessioniInput>
  }

  export type ecoscoresUpsertWithWhereUniqueWithoutSessioniInput = {
    where: ecoscoresWhereUniqueInput
    update: XOR<ecoscoresUpdateWithoutSessioniInput, ecoscoresUncheckedUpdateWithoutSessioniInput>
    create: XOR<ecoscoresCreateWithoutSessioniInput, ecoscoresUncheckedCreateWithoutSessioniInput>
  }

  export type ecoscoresUpdateWithWhereUniqueWithoutSessioniInput = {
    where: ecoscoresWhereUniqueInput
    data: XOR<ecoscoresUpdateWithoutSessioniInput, ecoscoresUncheckedUpdateWithoutSessioniInput>
  }

  export type ecoscoresUpdateManyWithWhereWithoutSessioniInput = {
    where: ecoscoresScalarWhereInput
    data: XOR<ecoscoresUpdateManyMutationInput, ecoscoresUncheckedUpdateManyWithoutSessioniInput>
  }

  export type cittadiniUpsertWithoutSessioniInput = {
    update: XOR<cittadiniUpdateWithoutSessioniInput, cittadiniUncheckedUpdateWithoutSessioniInput>
    create: XOR<cittadiniCreateWithoutSessioniInput, cittadiniUncheckedCreateWithoutSessioniInput>
    where?: cittadiniWhereInput
  }

  export type cittadiniUpdateToOneWithWhereWithoutSessioniInput = {
    where?: cittadiniWhereInput
    data: XOR<cittadiniUpdateWithoutSessioniInput, cittadiniUncheckedUpdateWithoutSessioniInput>
  }

  export type cittadiniUpdateWithoutSessioniInput = {
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    data_nascita?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    propriet_?: propriet_UpdateManyWithoutCittadiniNestedInput
  }

  export type cittadiniUncheckedUpdateWithoutSessioniInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    data_nascita?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    password?: StringFieldUpdateOperationsInput | string
    propriet_?: propriet_UncheckedUpdateManyWithoutCittadiniNestedInput
  }

  export type propriet_CreateWithoutVettureInput = {
    cittadini: cittadiniCreateNestedOneWithoutPropriet_Input
  }

  export type propriet_UncheckedCreateWithoutVettureInput = {
    id?: number
    id_cittadino: number
  }

  export type propriet_CreateOrConnectWithoutVettureInput = {
    where: propriet_WhereUniqueInput
    create: XOR<propriet_CreateWithoutVettureInput, propriet_UncheckedCreateWithoutVettureInput>
  }

  export type propriet_CreateManyVettureInputEnvelope = {
    data: propriet_CreateManyVettureInput | propriet_CreateManyVettureInput[]
    skipDuplicates?: boolean
  }

  export type propriet_UpsertWithWhereUniqueWithoutVettureInput = {
    where: propriet_WhereUniqueInput
    update: XOR<propriet_UpdateWithoutVettureInput, propriet_UncheckedUpdateWithoutVettureInput>
    create: XOR<propriet_CreateWithoutVettureInput, propriet_UncheckedCreateWithoutVettureInput>
  }

  export type propriet_UpdateWithWhereUniqueWithoutVettureInput = {
    where: propriet_WhereUniqueInput
    data: XOR<propriet_UpdateWithoutVettureInput, propriet_UncheckedUpdateWithoutVettureInput>
  }

  export type propriet_UpdateManyWithWhereWithoutVettureInput = {
    where: propriet_ScalarWhereInput
    data: XOR<propriet_UpdateManyMutationInput, propriet_UncheckedUpdateManyWithoutVettureInput>
  }

  export type ecoscoresCreateManyAreaInput = {
    id?: number
    punteggio?: number | null
    id_sessione: number
  }

  export type ecoscoresUpdateWithoutAreaInput = {
    punteggio?: NullableFloatFieldUpdateOperationsInput | number | null
    sessioni?: sessioniUpdateOneRequiredWithoutEcoscoresNestedInput
  }

  export type ecoscoresUncheckedUpdateWithoutAreaInput = {
    id?: IntFieldUpdateOperationsInput | number
    punteggio?: NullableFloatFieldUpdateOperationsInput | number | null
    id_sessione?: IntFieldUpdateOperationsInput | number
  }

  export type ecoscoresUncheckedUpdateManyWithoutAreaInput = {
    id?: IntFieldUpdateOperationsInput | number
    punteggio?: NullableFloatFieldUpdateOperationsInput | number | null
    id_sessione?: IntFieldUpdateOperationsInput | number
  }

  export type propriet_CreateManyCittadiniInput = {
    id?: number
    id_vettura: number
  }

  export type sessioniCreateManyCittadiniInput = {
    id?: number
  }

  export type propriet_UpdateWithoutCittadiniInput = {
    vetture?: vettureUpdateOneRequiredWithoutPropriet_NestedInput
  }

  export type propriet_UncheckedUpdateWithoutCittadiniInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_vettura?: IntFieldUpdateOperationsInput | number
  }

  export type propriet_UncheckedUpdateManyWithoutCittadiniInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_vettura?: IntFieldUpdateOperationsInput | number
  }

  export type sessioniUpdateWithoutCittadiniInput = {
    ecoscores?: ecoscoresUpdateManyWithoutSessioniNestedInput
  }

  export type sessioniUncheckedUpdateWithoutCittadiniInput = {
    id?: IntFieldUpdateOperationsInput | number
    ecoscores?: ecoscoresUncheckedUpdateManyWithoutSessioniNestedInput
  }

  export type sessioniUncheckedUpdateManyWithoutCittadiniInput = {
    id?: IntFieldUpdateOperationsInput | number
  }

  export type areaCreateManyComuniInput = {
    id?: number
  }

  export type areaUpdateWithoutComuniInput = {
    ecoscores?: ecoscoresUpdateManyWithoutAreaNestedInput
  }

  export type areaUncheckedUpdateWithoutComuniInput = {
    id?: IntFieldUpdateOperationsInput | number
    ecoscores?: ecoscoresUncheckedUpdateManyWithoutAreaNestedInput
  }

  export type areaUncheckedUpdateManyWithoutComuniInput = {
    id?: IntFieldUpdateOperationsInput | number
  }

  export type ecoscoresCreateManySessioniInput = {
    id?: number
    punteggio?: number | null
    id_area?: number
  }

  export type ecoscoresUpdateWithoutSessioniInput = {
    punteggio?: NullableFloatFieldUpdateOperationsInput | number | null
    area?: areaUpdateOneRequiredWithoutEcoscoresNestedInput
  }

  export type ecoscoresUncheckedUpdateWithoutSessioniInput = {
    id?: IntFieldUpdateOperationsInput | number
    punteggio?: NullableFloatFieldUpdateOperationsInput | number | null
    id_area?: IntFieldUpdateOperationsInput | number
  }

  export type ecoscoresUncheckedUpdateManyWithoutSessioniInput = {
    id?: IntFieldUpdateOperationsInput | number
    punteggio?: NullableFloatFieldUpdateOperationsInput | number | null
    id_area?: IntFieldUpdateOperationsInput | number
  }

  export type propriet_CreateManyVettureInput = {
    id?: number
    id_cittadino: number
  }

  export type propriet_UpdateWithoutVettureInput = {
    cittadini?: cittadiniUpdateOneRequiredWithoutPropriet_NestedInput
  }

  export type propriet_UncheckedUpdateWithoutVettureInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_cittadino?: IntFieldUpdateOperationsInput | number
  }

  export type propriet_UncheckedUpdateManyWithoutVettureInput = {
    id?: IntFieldUpdateOperationsInput | number
    id_cittadino?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}