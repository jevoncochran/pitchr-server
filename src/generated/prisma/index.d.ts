
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Lead
 * 
 */
export type Lead = $Result.DefaultSelection<Prisma.$LeadPayload>
/**
 * Model Contact
 * 
 */
export type Contact = $Result.DefaultSelection<Prisma.$ContactPayload>
/**
 * Model Industry
 * 
 */
export type Industry = $Result.DefaultSelection<Prisma.$IndustryPayload>
/**
 * Model BusinessType
 * 
 */
export type BusinessType = $Result.DefaultSelection<Prisma.$BusinessTypePayload>
/**
 * Model Location
 * 
 */
export type Location = $Result.DefaultSelection<Prisma.$LocationPayload>
/**
 * Model PhoneNumber
 * 
 */
export type PhoneNumber = $Result.DefaultSelection<Prisma.$PhoneNumberPayload>
/**
 * Model Note
 * 
 */
export type Note = $Result.DefaultSelection<Prisma.$NotePayload>
/**
 * Model TouchPoint
 * 
 */
export type TouchPoint = $Result.DefaultSelection<Prisma.$TouchPointPayload>
/**
 * Model Reminder
 * 
 */
export type Reminder = $Result.DefaultSelection<Prisma.$ReminderPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  STAFF: 'STAFF',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const SequencePosition: {
  VISIT_A: 'VISIT_A',
  A1: 'A1',
  A2: 'A2',
  A3: 'A3',
  VISIT_B: 'VISIT_B',
  B1: 'B1',
  B2: 'B2',
  B3: 'B3',
  VISIT_C: 'VISIT_C',
  C1: 'C1',
  C2: 'C2',
  C3: 'C3'
};

export type SequencePosition = (typeof SequencePosition)[keyof typeof SequencePosition]


export const PipelineStage: {
  NEW: 'NEW',
  CONTACTED: 'CONTACTED',
  ENGAGED: 'ENGAGED',
  MEETING_SCHEDULED: 'MEETING_SCHEDULED',
  PROPOSAL_SENT: 'PROPOSAL_SENT',
  CONVERTED: 'CONVERTED',
  DORMANT: 'DORMANT',
  NOT_A_FIT: 'NOT_A_FIT',
  LOST: 'LOST'
};

export type PipelineStage = (typeof PipelineStage)[keyof typeof PipelineStage]


export const LeadSource: {
  OUTREACH: 'OUTREACH',
  REFERRAL: 'REFERRAL',
  FORM: 'FORM'
};

export type LeadSource = (typeof LeadSource)[keyof typeof LeadSource]


export const DiscoveredVia: {
  OUTREACH: 'OUTREACH',
  REFERRAL: 'REFERRAL',
  INSTAGRAM: 'INSTAGRAM',
  FACEBOOK: 'FACEBOOK',
  TIKTOK: 'TIKTOK',
  YOUTUBE: 'YOUTUBE',
  GOOGLE: 'GOOGLE',
  OTHER: 'OTHER'
};

export type DiscoveredVia = (typeof DiscoveredVia)[keyof typeof DiscoveredVia]


export const Priority: {
  ONE: 'ONE',
  TWO: 'TWO',
  THREE: 'THREE'
};

export type Priority = (typeof Priority)[keyof typeof Priority]


export const TouchPointType: {
  EMAIL: 'EMAIL',
  INSTAGRAM_DM: 'INSTAGRAM_DM',
  CALL: 'CALL',
  TEXT: 'TEXT',
  IN_PERSON: 'IN_PERSON',
  MEETING: 'MEETING'
};

export type TouchPointType = (typeof TouchPointType)[keyof typeof TouchPointType]


export const PhoneType: {
  MOBILE: 'MOBILE',
  OFFICE: 'OFFICE',
  HOME: 'HOME'
};

export type PhoneType = (typeof PhoneType)[keyof typeof PhoneType]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type SequencePosition = $Enums.SequencePosition

export const SequencePosition: typeof $Enums.SequencePosition

export type PipelineStage = $Enums.PipelineStage

export const PipelineStage: typeof $Enums.PipelineStage

export type LeadSource = $Enums.LeadSource

export const LeadSource: typeof $Enums.LeadSource

export type DiscoveredVia = $Enums.DiscoveredVia

export const DiscoveredVia: typeof $Enums.DiscoveredVia

export type Priority = $Enums.Priority

export const Priority: typeof $Enums.Priority

export type TouchPointType = $Enums.TouchPointType

export const TouchPointType: typeof $Enums.TouchPointType

export type PhoneType = $Enums.PhoneType

export const PhoneType: typeof $Enums.PhoneType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lead`: Exposes CRUD operations for the **Lead** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Leads
    * const leads = await prisma.lead.findMany()
    * ```
    */
  get lead(): Prisma.LeadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contact`: Exposes CRUD operations for the **Contact** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contacts
    * const contacts = await prisma.contact.findMany()
    * ```
    */
  get contact(): Prisma.ContactDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.industry`: Exposes CRUD operations for the **Industry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Industries
    * const industries = await prisma.industry.findMany()
    * ```
    */
  get industry(): Prisma.IndustryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.businessType`: Exposes CRUD operations for the **BusinessType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BusinessTypes
    * const businessTypes = await prisma.businessType.findMany()
    * ```
    */
  get businessType(): Prisma.BusinessTypeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.location`: Exposes CRUD operations for the **Location** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Locations
    * const locations = await prisma.location.findMany()
    * ```
    */
  get location(): Prisma.LocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.phoneNumber`: Exposes CRUD operations for the **PhoneNumber** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PhoneNumbers
    * const phoneNumbers = await prisma.phoneNumber.findMany()
    * ```
    */
  get phoneNumber(): Prisma.PhoneNumberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.note`: Exposes CRUD operations for the **Note** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notes
    * const notes = await prisma.note.findMany()
    * ```
    */
  get note(): Prisma.NoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.touchPoint`: Exposes CRUD operations for the **TouchPoint** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TouchPoints
    * const touchPoints = await prisma.touchPoint.findMany()
    * ```
    */
  get touchPoint(): Prisma.TouchPointDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reminder`: Exposes CRUD operations for the **Reminder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reminders
    * const reminders = await prisma.reminder.findMany()
    * ```
    */
  get reminder(): Prisma.ReminderDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


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
    User: 'User',
    Lead: 'Lead',
    Contact: 'Contact',
    Industry: 'Industry',
    BusinessType: 'BusinessType',
    Location: 'Location',
    PhoneNumber: 'PhoneNumber',
    Note: 'Note',
    TouchPoint: 'TouchPoint',
    Reminder: 'Reminder'
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
      modelProps: "user" | "lead" | "contact" | "industry" | "businessType" | "location" | "phoneNumber" | "note" | "touchPoint" | "reminder"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Lead: {
        payload: Prisma.$LeadPayload<ExtArgs>
        fields: Prisma.LeadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findFirst: {
            args: Prisma.LeadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findMany: {
            args: Prisma.LeadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          create: {
            args: Prisma.LeadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          createMany: {
            args: Prisma.LeadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          delete: {
            args: Prisma.LeadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          update: {
            args: Prisma.LeadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          deleteMany: {
            args: Prisma.LeadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LeadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          upsert: {
            args: Prisma.LeadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          aggregate: {
            args: Prisma.LeadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLead>
          }
          groupBy: {
            args: Prisma.LeadGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeadGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeadCountArgs<ExtArgs>
            result: $Utils.Optional<LeadCountAggregateOutputType> | number
          }
        }
      }
      Contact: {
        payload: Prisma.$ContactPayload<ExtArgs>
        fields: Prisma.ContactFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          findFirst: {
            args: Prisma.ContactFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          findMany: {
            args: Prisma.ContactFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[]
          }
          create: {
            args: Prisma.ContactCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          createMany: {
            args: Prisma.ContactCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContactCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[]
          }
          delete: {
            args: Prisma.ContactDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          update: {
            args: Prisma.ContactUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          deleteMany: {
            args: Prisma.ContactDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContactUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContactUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[]
          }
          upsert: {
            args: Prisma.ContactUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          aggregate: {
            args: Prisma.ContactAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContact>
          }
          groupBy: {
            args: Prisma.ContactGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContactCountArgs<ExtArgs>
            result: $Utils.Optional<ContactCountAggregateOutputType> | number
          }
        }
      }
      Industry: {
        payload: Prisma.$IndustryPayload<ExtArgs>
        fields: Prisma.IndustryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IndustryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IndustryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryPayload>
          }
          findFirst: {
            args: Prisma.IndustryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IndustryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryPayload>
          }
          findMany: {
            args: Prisma.IndustryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryPayload>[]
          }
          create: {
            args: Prisma.IndustryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryPayload>
          }
          createMany: {
            args: Prisma.IndustryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IndustryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryPayload>[]
          }
          delete: {
            args: Prisma.IndustryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryPayload>
          }
          update: {
            args: Prisma.IndustryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryPayload>
          }
          deleteMany: {
            args: Prisma.IndustryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IndustryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IndustryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryPayload>[]
          }
          upsert: {
            args: Prisma.IndustryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustryPayload>
          }
          aggregate: {
            args: Prisma.IndustryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIndustry>
          }
          groupBy: {
            args: Prisma.IndustryGroupByArgs<ExtArgs>
            result: $Utils.Optional<IndustryGroupByOutputType>[]
          }
          count: {
            args: Prisma.IndustryCountArgs<ExtArgs>
            result: $Utils.Optional<IndustryCountAggregateOutputType> | number
          }
        }
      }
      BusinessType: {
        payload: Prisma.$BusinessTypePayload<ExtArgs>
        fields: Prisma.BusinessTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BusinessTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BusinessTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessTypePayload>
          }
          findFirst: {
            args: Prisma.BusinessTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BusinessTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessTypePayload>
          }
          findMany: {
            args: Prisma.BusinessTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessTypePayload>[]
          }
          create: {
            args: Prisma.BusinessTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessTypePayload>
          }
          createMany: {
            args: Prisma.BusinessTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BusinessTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessTypePayload>[]
          }
          delete: {
            args: Prisma.BusinessTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessTypePayload>
          }
          update: {
            args: Prisma.BusinessTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessTypePayload>
          }
          deleteMany: {
            args: Prisma.BusinessTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BusinessTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BusinessTypeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessTypePayload>[]
          }
          upsert: {
            args: Prisma.BusinessTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessTypePayload>
          }
          aggregate: {
            args: Prisma.BusinessTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBusinessType>
          }
          groupBy: {
            args: Prisma.BusinessTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<BusinessTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.BusinessTypeCountArgs<ExtArgs>
            result: $Utils.Optional<BusinessTypeCountAggregateOutputType> | number
          }
        }
      }
      Location: {
        payload: Prisma.$LocationPayload<ExtArgs>
        fields: Prisma.LocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findFirst: {
            args: Prisma.LocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findMany: {
            args: Prisma.LocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          create: {
            args: Prisma.LocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          createMany: {
            args: Prisma.LocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          delete: {
            args: Prisma.LocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          update: {
            args: Prisma.LocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          deleteMany: {
            args: Prisma.LocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          upsert: {
            args: Prisma.LocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          aggregate: {
            args: Prisma.LocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocation>
          }
          groupBy: {
            args: Prisma.LocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.LocationCountArgs<ExtArgs>
            result: $Utils.Optional<LocationCountAggregateOutputType> | number
          }
        }
      }
      PhoneNumber: {
        payload: Prisma.$PhoneNumberPayload<ExtArgs>
        fields: Prisma.PhoneNumberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PhoneNumberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhoneNumberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PhoneNumberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhoneNumberPayload>
          }
          findFirst: {
            args: Prisma.PhoneNumberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhoneNumberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PhoneNumberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhoneNumberPayload>
          }
          findMany: {
            args: Prisma.PhoneNumberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhoneNumberPayload>[]
          }
          create: {
            args: Prisma.PhoneNumberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhoneNumberPayload>
          }
          createMany: {
            args: Prisma.PhoneNumberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PhoneNumberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhoneNumberPayload>[]
          }
          delete: {
            args: Prisma.PhoneNumberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhoneNumberPayload>
          }
          update: {
            args: Prisma.PhoneNumberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhoneNumberPayload>
          }
          deleteMany: {
            args: Prisma.PhoneNumberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PhoneNumberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PhoneNumberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhoneNumberPayload>[]
          }
          upsert: {
            args: Prisma.PhoneNumberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhoneNumberPayload>
          }
          aggregate: {
            args: Prisma.PhoneNumberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePhoneNumber>
          }
          groupBy: {
            args: Prisma.PhoneNumberGroupByArgs<ExtArgs>
            result: $Utils.Optional<PhoneNumberGroupByOutputType>[]
          }
          count: {
            args: Prisma.PhoneNumberCountArgs<ExtArgs>
            result: $Utils.Optional<PhoneNumberCountAggregateOutputType> | number
          }
        }
      }
      Note: {
        payload: Prisma.$NotePayload<ExtArgs>
        fields: Prisma.NoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          findFirst: {
            args: Prisma.NoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          findMany: {
            args: Prisma.NoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>[]
          }
          create: {
            args: Prisma.NoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          createMany: {
            args: Prisma.NoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>[]
          }
          delete: {
            args: Prisma.NoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          update: {
            args: Prisma.NoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          deleteMany: {
            args: Prisma.NoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>[]
          }
          upsert: {
            args: Prisma.NoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          aggregate: {
            args: Prisma.NoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNote>
          }
          groupBy: {
            args: Prisma.NoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<NoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.NoteCountArgs<ExtArgs>
            result: $Utils.Optional<NoteCountAggregateOutputType> | number
          }
        }
      }
      TouchPoint: {
        payload: Prisma.$TouchPointPayload<ExtArgs>
        fields: Prisma.TouchPointFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TouchPointFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TouchPointPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TouchPointFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TouchPointPayload>
          }
          findFirst: {
            args: Prisma.TouchPointFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TouchPointPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TouchPointFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TouchPointPayload>
          }
          findMany: {
            args: Prisma.TouchPointFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TouchPointPayload>[]
          }
          create: {
            args: Prisma.TouchPointCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TouchPointPayload>
          }
          createMany: {
            args: Prisma.TouchPointCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TouchPointCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TouchPointPayload>[]
          }
          delete: {
            args: Prisma.TouchPointDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TouchPointPayload>
          }
          update: {
            args: Prisma.TouchPointUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TouchPointPayload>
          }
          deleteMany: {
            args: Prisma.TouchPointDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TouchPointUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TouchPointUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TouchPointPayload>[]
          }
          upsert: {
            args: Prisma.TouchPointUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TouchPointPayload>
          }
          aggregate: {
            args: Prisma.TouchPointAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTouchPoint>
          }
          groupBy: {
            args: Prisma.TouchPointGroupByArgs<ExtArgs>
            result: $Utils.Optional<TouchPointGroupByOutputType>[]
          }
          count: {
            args: Prisma.TouchPointCountArgs<ExtArgs>
            result: $Utils.Optional<TouchPointCountAggregateOutputType> | number
          }
        }
      }
      Reminder: {
        payload: Prisma.$ReminderPayload<ExtArgs>
        fields: Prisma.ReminderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReminderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReminderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          findFirst: {
            args: Prisma.ReminderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReminderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          findMany: {
            args: Prisma.ReminderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>[]
          }
          create: {
            args: Prisma.ReminderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          createMany: {
            args: Prisma.ReminderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReminderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>[]
          }
          delete: {
            args: Prisma.ReminderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          update: {
            args: Prisma.ReminderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          deleteMany: {
            args: Prisma.ReminderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReminderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReminderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>[]
          }
          upsert: {
            args: Prisma.ReminderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          aggregate: {
            args: Prisma.ReminderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReminder>
          }
          groupBy: {
            args: Prisma.ReminderGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReminderGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReminderCountArgs<ExtArgs>
            result: $Utils.Optional<ReminderCountAggregateOutputType> | number
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
    user?: UserOmit
    lead?: LeadOmit
    contact?: ContactOmit
    industry?: IndustryOmit
    businessType?: BusinessTypeOmit
    location?: LocationOmit
    phoneNumber?: PhoneNumberOmit
    note?: NoteOmit
    touchPoint?: TouchPointOmit
    reminder?: ReminderOmit
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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    touchPoints: number
    notes: number
    assignedLeads: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    touchPoints?: boolean | UserCountOutputTypeCountTouchPointsArgs
    notes?: boolean | UserCountOutputTypeCountNotesArgs
    assignedLeads?: boolean | UserCountOutputTypeCountAssignedLeadsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTouchPointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TouchPointWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAssignedLeadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
  }


  /**
   * Count Type LeadCountOutputType
   */

  export type LeadCountOutputType = {
    locations: number
    contacts: number
    touchPoint: number
    notes: number
    reminders: number
    referrals: number
  }

  export type LeadCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    locations?: boolean | LeadCountOutputTypeCountLocationsArgs
    contacts?: boolean | LeadCountOutputTypeCountContactsArgs
    touchPoint?: boolean | LeadCountOutputTypeCountTouchPointArgs
    notes?: boolean | LeadCountOutputTypeCountNotesArgs
    reminders?: boolean | LeadCountOutputTypeCountRemindersArgs
    referrals?: boolean | LeadCountOutputTypeCountReferralsArgs
  }

  // Custom InputTypes
  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCountOutputType
     */
    select?: LeadCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeCountLocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationWhereInput
  }

  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeCountContactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactWhereInput
  }

  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeCountTouchPointArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TouchPointWhereInput
  }

  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeCountNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoteWhereInput
  }

  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeCountRemindersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReminderWhereInput
  }

  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeCountReferralsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
  }


  /**
   * Count Type IndustryCountOutputType
   */

  export type IndustryCountOutputType = {
    leads: number
  }

  export type IndustryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leads?: boolean | IndustryCountOutputTypeCountLeadsArgs
  }

  // Custom InputTypes
  /**
   * IndustryCountOutputType without action
   */
  export type IndustryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustryCountOutputType
     */
    select?: IndustryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * IndustryCountOutputType without action
   */
  export type IndustryCountOutputTypeCountLeadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
  }


  /**
   * Count Type BusinessTypeCountOutputType
   */

  export type BusinessTypeCountOutputType = {
    leads: number
  }

  export type BusinessTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leads?: boolean | BusinessTypeCountOutputTypeCountLeadsArgs
  }

  // Custom InputTypes
  /**
   * BusinessTypeCountOutputType without action
   */
  export type BusinessTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessTypeCountOutputType
     */
    select?: BusinessTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BusinessTypeCountOutputType without action
   */
  export type BusinessTypeCountOutputTypeCountLeadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
  }


  /**
   * Count Type LocationCountOutputType
   */

  export type LocationCountOutputType = {
    phoneNumbers: number
  }

  export type LocationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    phoneNumbers?: boolean | LocationCountOutputTypeCountPhoneNumbersArgs
  }

  // Custom InputTypes
  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCountOutputType
     */
    select?: LocationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountPhoneNumbersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PhoneNumberWhereInput
  }


  /**
   * Count Type TouchPointCountOutputType
   */

  export type TouchPointCountOutputType = {
    reminders: number
  }

  export type TouchPointCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reminders?: boolean | TouchPointCountOutputTypeCountRemindersArgs
  }

  // Custom InputTypes
  /**
   * TouchPointCountOutputType without action
   */
  export type TouchPointCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TouchPointCountOutputType
     */
    select?: TouchPointCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TouchPointCountOutputType without action
   */
  export type TouchPointCountOutputTypeCountRemindersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReminderWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    firstName: string | null
    lastName: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    firstName: string | null
    lastName: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    firstName: number
    lastName: number
    email: number
    password: number
    role: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    firstName?: true
    lastName?: true
    email?: true
    password?: true
    role?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    firstName?: true
    lastName?: true
    email?: true
    password?: true
    role?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    firstName?: true
    lastName?: true
    email?: true
    password?: true
    role?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    firstName: string
    lastName: string
    email: string
    password: string
    role: $Enums.Role
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    touchPoints?: boolean | User$touchPointsArgs<ExtArgs>
    notes?: boolean | User$notesArgs<ExtArgs>
    assignedLeads?: boolean | User$assignedLeadsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "firstName" | "lastName" | "email" | "password" | "role", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    touchPoints?: boolean | User$touchPointsArgs<ExtArgs>
    notes?: boolean | User$notesArgs<ExtArgs>
    assignedLeads?: boolean | User$assignedLeadsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      touchPoints: Prisma.$TouchPointPayload<ExtArgs>[]
      notes: Prisma.$NotePayload<ExtArgs>[]
      assignedLeads: Prisma.$LeadPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      firstName: string
      lastName: string
      email: string
      password: string
      role: $Enums.Role
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    touchPoints<T extends User$touchPointsArgs<ExtArgs> = {}>(args?: Subset<T, User$touchPointsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TouchPointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notes<T extends User$notesArgs<ExtArgs> = {}>(args?: Subset<T, User$notesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assignedLeads<T extends User$assignedLeadsArgs<ExtArgs> = {}>(args?: Subset<T, User$assignedLeadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.touchPoints
   */
  export type User$touchPointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TouchPoint
     */
    select?: TouchPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TouchPoint
     */
    omit?: TouchPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TouchPointInclude<ExtArgs> | null
    where?: TouchPointWhereInput
    orderBy?: TouchPointOrderByWithRelationInput | TouchPointOrderByWithRelationInput[]
    cursor?: TouchPointWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TouchPointScalarFieldEnum | TouchPointScalarFieldEnum[]
  }

  /**
   * User.notes
   */
  export type User$notesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    where?: NoteWhereInput
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    cursor?: NoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * User.assignedLeads
   */
  export type User$assignedLeadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    cursor?: LeadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Lead
   */

  export type AggregateLead = {
    _count: LeadCountAggregateOutputType | null
    _avg: LeadAvgAggregateOutputType | null
    _sum: LeadSumAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  export type LeadAvgAggregateOutputType = {
    igFollowerCount: number | null
    sequenceStep: number | null
    instagramFollowers: number | null
    tiktokFollowers: number | null
    youtubeFollowers: number | null
    facebookFollowers: number | null
  }

  export type LeadSumAggregateOutputType = {
    igFollowerCount: number | null
    sequenceStep: number | null
    instagramFollowers: number | null
    tiktokFollowers: number | null
    youtubeFollowers: number | null
    facebookFollowers: number | null
  }

  export type LeadMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    business: string | null
    primaryLocationId: string | null
    industryId: string | null
    businessTypeId: string | null
    igHandle: string | null
    igFollowerCount: number | null
    email: string | null
    website: string | null
    pipelineStage: $Enums.PipelineStage | null
    source: $Enums.LeadSource | null
    discoveredVia: $Enums.DiscoveredVia | null
    discoveredViaOther: string | null
    convertedAt: Date | null
    isBlackOwned: boolean | null
    isWomanOwned: boolean | null
    isLatinoOwned: boolean | null
    isImmigrantOwned: boolean | null
    priority: $Enums.Priority | null
    sequenceStep: number | null
    sequenceActive: boolean | null
    isHot: boolean | null
    assignedToId: string | null
    referredByLeadId: string | null
    referredByName: string | null
    instagramHandle: string | null
    instagramFollowers: number | null
    tiktokHandle: string | null
    tiktokFollowers: number | null
    youtubeHandle: string | null
    youtubeFollowers: number | null
    facebookHandle: string | null
    facebookFollowers: number | null
  }

  export type LeadMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    business: string | null
    primaryLocationId: string | null
    industryId: string | null
    businessTypeId: string | null
    igHandle: string | null
    igFollowerCount: number | null
    email: string | null
    website: string | null
    pipelineStage: $Enums.PipelineStage | null
    source: $Enums.LeadSource | null
    discoveredVia: $Enums.DiscoveredVia | null
    discoveredViaOther: string | null
    convertedAt: Date | null
    isBlackOwned: boolean | null
    isWomanOwned: boolean | null
    isLatinoOwned: boolean | null
    isImmigrantOwned: boolean | null
    priority: $Enums.Priority | null
    sequenceStep: number | null
    sequenceActive: boolean | null
    isHot: boolean | null
    assignedToId: string | null
    referredByLeadId: string | null
    referredByName: string | null
    instagramHandle: string | null
    instagramFollowers: number | null
    tiktokHandle: string | null
    tiktokFollowers: number | null
    youtubeHandle: string | null
    youtubeFollowers: number | null
    facebookHandle: string | null
    facebookFollowers: number | null
  }

  export type LeadCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    business: number
    primaryLocationId: number
    industryId: number
    businessTypeId: number
    igHandle: number
    igFollowerCount: number
    email: number
    website: number
    pipelineStage: number
    source: number
    discoveredVia: number
    discoveredViaOther: number
    convertedAt: number
    isBlackOwned: number
    isWomanOwned: number
    isLatinoOwned: number
    isImmigrantOwned: number
    priority: number
    sequenceStep: number
    sequenceActive: number
    isHot: number
    assignedToId: number
    referredByLeadId: number
    referredByName: number
    instagramHandle: number
    instagramFollowers: number
    tiktokHandle: number
    tiktokFollowers: number
    youtubeHandle: number
    youtubeFollowers: number
    facebookHandle: number
    facebookFollowers: number
    _all: number
  }


  export type LeadAvgAggregateInputType = {
    igFollowerCount?: true
    sequenceStep?: true
    instagramFollowers?: true
    tiktokFollowers?: true
    youtubeFollowers?: true
    facebookFollowers?: true
  }

  export type LeadSumAggregateInputType = {
    igFollowerCount?: true
    sequenceStep?: true
    instagramFollowers?: true
    tiktokFollowers?: true
    youtubeFollowers?: true
    facebookFollowers?: true
  }

  export type LeadMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    business?: true
    primaryLocationId?: true
    industryId?: true
    businessTypeId?: true
    igHandle?: true
    igFollowerCount?: true
    email?: true
    website?: true
    pipelineStage?: true
    source?: true
    discoveredVia?: true
    discoveredViaOther?: true
    convertedAt?: true
    isBlackOwned?: true
    isWomanOwned?: true
    isLatinoOwned?: true
    isImmigrantOwned?: true
    priority?: true
    sequenceStep?: true
    sequenceActive?: true
    isHot?: true
    assignedToId?: true
    referredByLeadId?: true
    referredByName?: true
    instagramHandle?: true
    instagramFollowers?: true
    tiktokHandle?: true
    tiktokFollowers?: true
    youtubeHandle?: true
    youtubeFollowers?: true
    facebookHandle?: true
    facebookFollowers?: true
  }

  export type LeadMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    business?: true
    primaryLocationId?: true
    industryId?: true
    businessTypeId?: true
    igHandle?: true
    igFollowerCount?: true
    email?: true
    website?: true
    pipelineStage?: true
    source?: true
    discoveredVia?: true
    discoveredViaOther?: true
    convertedAt?: true
    isBlackOwned?: true
    isWomanOwned?: true
    isLatinoOwned?: true
    isImmigrantOwned?: true
    priority?: true
    sequenceStep?: true
    sequenceActive?: true
    isHot?: true
    assignedToId?: true
    referredByLeadId?: true
    referredByName?: true
    instagramHandle?: true
    instagramFollowers?: true
    tiktokHandle?: true
    tiktokFollowers?: true
    youtubeHandle?: true
    youtubeFollowers?: true
    facebookHandle?: true
    facebookFollowers?: true
  }

  export type LeadCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    business?: true
    primaryLocationId?: true
    industryId?: true
    businessTypeId?: true
    igHandle?: true
    igFollowerCount?: true
    email?: true
    website?: true
    pipelineStage?: true
    source?: true
    discoveredVia?: true
    discoveredViaOther?: true
    convertedAt?: true
    isBlackOwned?: true
    isWomanOwned?: true
    isLatinoOwned?: true
    isImmigrantOwned?: true
    priority?: true
    sequenceStep?: true
    sequenceActive?: true
    isHot?: true
    assignedToId?: true
    referredByLeadId?: true
    referredByName?: true
    instagramHandle?: true
    instagramFollowers?: true
    tiktokHandle?: true
    tiktokFollowers?: true
    youtubeHandle?: true
    youtubeFollowers?: true
    facebookHandle?: true
    facebookFollowers?: true
    _all?: true
  }

  export type LeadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lead to aggregate.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Leads
    **/
    _count?: true | LeadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeadMaxAggregateInputType
  }

  export type GetLeadAggregateType<T extends LeadAggregateArgs> = {
        [P in keyof T & keyof AggregateLead]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLead[P]>
      : GetScalarType<T[P], AggregateLead[P]>
  }




  export type LeadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithAggregationInput | LeadOrderByWithAggregationInput[]
    by: LeadScalarFieldEnum[] | LeadScalarFieldEnum
    having?: LeadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeadCountAggregateInputType | true
    _avg?: LeadAvgAggregateInputType
    _sum?: LeadSumAggregateInputType
    _min?: LeadMinAggregateInputType
    _max?: LeadMaxAggregateInputType
  }

  export type LeadGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    business: string
    primaryLocationId: string | null
    industryId: string
    businessTypeId: string
    igHandle: string | null
    igFollowerCount: number | null
    email: string | null
    website: string | null
    pipelineStage: $Enums.PipelineStage
    source: $Enums.LeadSource | null
    discoveredVia: $Enums.DiscoveredVia | null
    discoveredViaOther: string | null
    convertedAt: Date | null
    isBlackOwned: boolean
    isWomanOwned: boolean
    isLatinoOwned: boolean
    isImmigrantOwned: boolean
    priority: $Enums.Priority | null
    sequenceStep: number
    sequenceActive: boolean
    isHot: boolean
    assignedToId: string | null
    referredByLeadId: string | null
    referredByName: string | null
    instagramHandle: string | null
    instagramFollowers: number | null
    tiktokHandle: string | null
    tiktokFollowers: number | null
    youtubeHandle: string | null
    youtubeFollowers: number | null
    facebookHandle: string | null
    facebookFollowers: number | null
    _count: LeadCountAggregateOutputType | null
    _avg: LeadAvgAggregateOutputType | null
    _sum: LeadSumAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  type GetLeadGroupByPayload<T extends LeadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeadGroupByOutputType[P]>
            : GetScalarType<T[P], LeadGroupByOutputType[P]>
        }
      >
    >


  export type LeadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    business?: boolean
    primaryLocationId?: boolean
    industryId?: boolean
    businessTypeId?: boolean
    igHandle?: boolean
    igFollowerCount?: boolean
    email?: boolean
    website?: boolean
    pipelineStage?: boolean
    source?: boolean
    discoveredVia?: boolean
    discoveredViaOther?: boolean
    convertedAt?: boolean
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: boolean
    sequenceStep?: boolean
    sequenceActive?: boolean
    isHot?: boolean
    assignedToId?: boolean
    referredByLeadId?: boolean
    referredByName?: boolean
    instagramHandle?: boolean
    instagramFollowers?: boolean
    tiktokHandle?: boolean
    tiktokFollowers?: boolean
    youtubeHandle?: boolean
    youtubeFollowers?: boolean
    facebookHandle?: boolean
    facebookFollowers?: boolean
    locations?: boolean | Lead$locationsArgs<ExtArgs>
    primaryLocation?: boolean | Lead$primaryLocationArgs<ExtArgs>
    contacts?: boolean | Lead$contactsArgs<ExtArgs>
    industry?: boolean | IndustryDefaultArgs<ExtArgs>
    businessType?: boolean | BusinessTypeDefaultArgs<ExtArgs>
    touchPoint?: boolean | Lead$touchPointArgs<ExtArgs>
    notes?: boolean | Lead$notesArgs<ExtArgs>
    reminders?: boolean | Lead$remindersArgs<ExtArgs>
    assignedTo?: boolean | Lead$assignedToArgs<ExtArgs>
    referredByLead?: boolean | Lead$referredByLeadArgs<ExtArgs>
    referrals?: boolean | Lead$referralsArgs<ExtArgs>
    _count?: boolean | LeadCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    business?: boolean
    primaryLocationId?: boolean
    industryId?: boolean
    businessTypeId?: boolean
    igHandle?: boolean
    igFollowerCount?: boolean
    email?: boolean
    website?: boolean
    pipelineStage?: boolean
    source?: boolean
    discoveredVia?: boolean
    discoveredViaOther?: boolean
    convertedAt?: boolean
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: boolean
    sequenceStep?: boolean
    sequenceActive?: boolean
    isHot?: boolean
    assignedToId?: boolean
    referredByLeadId?: boolean
    referredByName?: boolean
    instagramHandle?: boolean
    instagramFollowers?: boolean
    tiktokHandle?: boolean
    tiktokFollowers?: boolean
    youtubeHandle?: boolean
    youtubeFollowers?: boolean
    facebookHandle?: boolean
    facebookFollowers?: boolean
    primaryLocation?: boolean | Lead$primaryLocationArgs<ExtArgs>
    industry?: boolean | IndustryDefaultArgs<ExtArgs>
    businessType?: boolean | BusinessTypeDefaultArgs<ExtArgs>
    assignedTo?: boolean | Lead$assignedToArgs<ExtArgs>
    referredByLead?: boolean | Lead$referredByLeadArgs<ExtArgs>
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    business?: boolean
    primaryLocationId?: boolean
    industryId?: boolean
    businessTypeId?: boolean
    igHandle?: boolean
    igFollowerCount?: boolean
    email?: boolean
    website?: boolean
    pipelineStage?: boolean
    source?: boolean
    discoveredVia?: boolean
    discoveredViaOther?: boolean
    convertedAt?: boolean
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: boolean
    sequenceStep?: boolean
    sequenceActive?: boolean
    isHot?: boolean
    assignedToId?: boolean
    referredByLeadId?: boolean
    referredByName?: boolean
    instagramHandle?: boolean
    instagramFollowers?: boolean
    tiktokHandle?: boolean
    tiktokFollowers?: boolean
    youtubeHandle?: boolean
    youtubeFollowers?: boolean
    facebookHandle?: boolean
    facebookFollowers?: boolean
    primaryLocation?: boolean | Lead$primaryLocationArgs<ExtArgs>
    industry?: boolean | IndustryDefaultArgs<ExtArgs>
    businessType?: boolean | BusinessTypeDefaultArgs<ExtArgs>
    assignedTo?: boolean | Lead$assignedToArgs<ExtArgs>
    referredByLead?: boolean | Lead$referredByLeadArgs<ExtArgs>
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    business?: boolean
    primaryLocationId?: boolean
    industryId?: boolean
    businessTypeId?: boolean
    igHandle?: boolean
    igFollowerCount?: boolean
    email?: boolean
    website?: boolean
    pipelineStage?: boolean
    source?: boolean
    discoveredVia?: boolean
    discoveredViaOther?: boolean
    convertedAt?: boolean
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: boolean
    sequenceStep?: boolean
    sequenceActive?: boolean
    isHot?: boolean
    assignedToId?: boolean
    referredByLeadId?: boolean
    referredByName?: boolean
    instagramHandle?: boolean
    instagramFollowers?: boolean
    tiktokHandle?: boolean
    tiktokFollowers?: boolean
    youtubeHandle?: boolean
    youtubeFollowers?: boolean
    facebookHandle?: boolean
    facebookFollowers?: boolean
  }

  export type LeadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "business" | "primaryLocationId" | "industryId" | "businessTypeId" | "igHandle" | "igFollowerCount" | "email" | "website" | "pipelineStage" | "source" | "discoveredVia" | "discoveredViaOther" | "convertedAt" | "isBlackOwned" | "isWomanOwned" | "isLatinoOwned" | "isImmigrantOwned" | "priority" | "sequenceStep" | "sequenceActive" | "isHot" | "assignedToId" | "referredByLeadId" | "referredByName" | "instagramHandle" | "instagramFollowers" | "tiktokHandle" | "tiktokFollowers" | "youtubeHandle" | "youtubeFollowers" | "facebookHandle" | "facebookFollowers", ExtArgs["result"]["lead"]>
  export type LeadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    locations?: boolean | Lead$locationsArgs<ExtArgs>
    primaryLocation?: boolean | Lead$primaryLocationArgs<ExtArgs>
    contacts?: boolean | Lead$contactsArgs<ExtArgs>
    industry?: boolean | IndustryDefaultArgs<ExtArgs>
    businessType?: boolean | BusinessTypeDefaultArgs<ExtArgs>
    touchPoint?: boolean | Lead$touchPointArgs<ExtArgs>
    notes?: boolean | Lead$notesArgs<ExtArgs>
    reminders?: boolean | Lead$remindersArgs<ExtArgs>
    assignedTo?: boolean | Lead$assignedToArgs<ExtArgs>
    referredByLead?: boolean | Lead$referredByLeadArgs<ExtArgs>
    referrals?: boolean | Lead$referralsArgs<ExtArgs>
    _count?: boolean | LeadCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LeadIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    primaryLocation?: boolean | Lead$primaryLocationArgs<ExtArgs>
    industry?: boolean | IndustryDefaultArgs<ExtArgs>
    businessType?: boolean | BusinessTypeDefaultArgs<ExtArgs>
    assignedTo?: boolean | Lead$assignedToArgs<ExtArgs>
    referredByLead?: boolean | Lead$referredByLeadArgs<ExtArgs>
  }
  export type LeadIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    primaryLocation?: boolean | Lead$primaryLocationArgs<ExtArgs>
    industry?: boolean | IndustryDefaultArgs<ExtArgs>
    businessType?: boolean | BusinessTypeDefaultArgs<ExtArgs>
    assignedTo?: boolean | Lead$assignedToArgs<ExtArgs>
    referredByLead?: boolean | Lead$referredByLeadArgs<ExtArgs>
  }

  export type $LeadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lead"
    objects: {
      locations: Prisma.$LocationPayload<ExtArgs>[]
      primaryLocation: Prisma.$LocationPayload<ExtArgs> | null
      contacts: Prisma.$ContactPayload<ExtArgs>[]
      industry: Prisma.$IndustryPayload<ExtArgs>
      businessType: Prisma.$BusinessTypePayload<ExtArgs>
      touchPoint: Prisma.$TouchPointPayload<ExtArgs>[]
      notes: Prisma.$NotePayload<ExtArgs>[]
      reminders: Prisma.$ReminderPayload<ExtArgs>[]
      assignedTo: Prisma.$UserPayload<ExtArgs> | null
      referredByLead: Prisma.$LeadPayload<ExtArgs> | null
      referrals: Prisma.$LeadPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      business: string
      primaryLocationId: string | null
      industryId: string
      businessTypeId: string
      igHandle: string | null
      igFollowerCount: number | null
      email: string | null
      website: string | null
      pipelineStage: $Enums.PipelineStage
      source: $Enums.LeadSource | null
      discoveredVia: $Enums.DiscoveredVia | null
      discoveredViaOther: string | null
      convertedAt: Date | null
      isBlackOwned: boolean
      isWomanOwned: boolean
      isLatinoOwned: boolean
      isImmigrantOwned: boolean
      priority: $Enums.Priority | null
      sequenceStep: number
      sequenceActive: boolean
      isHot: boolean
      assignedToId: string | null
      referredByLeadId: string | null
      referredByName: string | null
      instagramHandle: string | null
      instagramFollowers: number | null
      tiktokHandle: string | null
      tiktokFollowers: number | null
      youtubeHandle: string | null
      youtubeFollowers: number | null
      facebookHandle: string | null
      facebookFollowers: number | null
    }, ExtArgs["result"]["lead"]>
    composites: {}
  }

  type LeadGetPayload<S extends boolean | null | undefined | LeadDefaultArgs> = $Result.GetResult<Prisma.$LeadPayload, S>

  type LeadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeadCountAggregateInputType | true
    }

  export interface LeadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lead'], meta: { name: 'Lead' } }
    /**
     * Find zero or one Lead that matches the filter.
     * @param {LeadFindUniqueArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeadFindUniqueArgs>(args: SelectSubset<T, LeadFindUniqueArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Lead that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeadFindUniqueOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeadFindUniqueOrThrowArgs>(args: SelectSubset<T, LeadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lead that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeadFindFirstArgs>(args?: SelectSubset<T, LeadFindFirstArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lead that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeadFindFirstOrThrowArgs>(args?: SelectSubset<T, LeadFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Leads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leads
     * const leads = await prisma.lead.findMany()
     * 
     * // Get first 10 Leads
     * const leads = await prisma.lead.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leadWithIdOnly = await prisma.lead.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeadFindManyArgs>(args?: SelectSubset<T, LeadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Lead.
     * @param {LeadCreateArgs} args - Arguments to create a Lead.
     * @example
     * // Create one Lead
     * const Lead = await prisma.lead.create({
     *   data: {
     *     // ... data to create a Lead
     *   }
     * })
     * 
     */
    create<T extends LeadCreateArgs>(args: SelectSubset<T, LeadCreateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Leads.
     * @param {LeadCreateManyArgs} args - Arguments to create many Leads.
     * @example
     * // Create many Leads
     * const lead = await prisma.lead.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeadCreateManyArgs>(args?: SelectSubset<T, LeadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Leads and returns the data saved in the database.
     * @param {LeadCreateManyAndReturnArgs} args - Arguments to create many Leads.
     * @example
     * // Create many Leads
     * const lead = await prisma.lead.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Leads and only return the `id`
     * const leadWithIdOnly = await prisma.lead.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeadCreateManyAndReturnArgs>(args?: SelectSubset<T, LeadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Lead.
     * @param {LeadDeleteArgs} args - Arguments to delete one Lead.
     * @example
     * // Delete one Lead
     * const Lead = await prisma.lead.delete({
     *   where: {
     *     // ... filter to delete one Lead
     *   }
     * })
     * 
     */
    delete<T extends LeadDeleteArgs>(args: SelectSubset<T, LeadDeleteArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Lead.
     * @param {LeadUpdateArgs} args - Arguments to update one Lead.
     * @example
     * // Update one Lead
     * const lead = await prisma.lead.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeadUpdateArgs>(args: SelectSubset<T, LeadUpdateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Leads.
     * @param {LeadDeleteManyArgs} args - Arguments to filter Leads to delete.
     * @example
     * // Delete a few Leads
     * const { count } = await prisma.lead.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeadDeleteManyArgs>(args?: SelectSubset<T, LeadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leads
     * const lead = await prisma.lead.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeadUpdateManyArgs>(args: SelectSubset<T, LeadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leads and returns the data updated in the database.
     * @param {LeadUpdateManyAndReturnArgs} args - Arguments to update many Leads.
     * @example
     * // Update many Leads
     * const lead = await prisma.lead.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Leads and only return the `id`
     * const leadWithIdOnly = await prisma.lead.updateManyAndReturn({
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
    updateManyAndReturn<T extends LeadUpdateManyAndReturnArgs>(args: SelectSubset<T, LeadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Lead.
     * @param {LeadUpsertArgs} args - Arguments to update or create a Lead.
     * @example
     * // Update or create a Lead
     * const lead = await prisma.lead.upsert({
     *   create: {
     *     // ... data to create a Lead
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lead we want to update
     *   }
     * })
     */
    upsert<T extends LeadUpsertArgs>(args: SelectSubset<T, LeadUpsertArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCountArgs} args - Arguments to filter Leads to count.
     * @example
     * // Count the number of Leads
     * const count = await prisma.lead.count({
     *   where: {
     *     // ... the filter for the Leads we want to count
     *   }
     * })
    **/
    count<T extends LeadCountArgs>(
      args?: Subset<T, LeadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LeadAggregateArgs>(args: Subset<T, LeadAggregateArgs>): Prisma.PrismaPromise<GetLeadAggregateType<T>>

    /**
     * Group by Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadGroupByArgs} args - Group by arguments.
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
      T extends LeadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeadGroupByArgs['orderBy'] }
        : { orderBy?: LeadGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LeadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lead model
   */
  readonly fields: LeadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lead.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    locations<T extends Lead$locationsArgs<ExtArgs> = {}>(args?: Subset<T, Lead$locationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    primaryLocation<T extends Lead$primaryLocationArgs<ExtArgs> = {}>(args?: Subset<T, Lead$primaryLocationArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    contacts<T extends Lead$contactsArgs<ExtArgs> = {}>(args?: Subset<T, Lead$contactsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    industry<T extends IndustryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, IndustryDefaultArgs<ExtArgs>>): Prisma__IndustryClient<$Result.GetResult<Prisma.$IndustryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    businessType<T extends BusinessTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BusinessTypeDefaultArgs<ExtArgs>>): Prisma__BusinessTypeClient<$Result.GetResult<Prisma.$BusinessTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    touchPoint<T extends Lead$touchPointArgs<ExtArgs> = {}>(args?: Subset<T, Lead$touchPointArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TouchPointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notes<T extends Lead$notesArgs<ExtArgs> = {}>(args?: Subset<T, Lead$notesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reminders<T extends Lead$remindersArgs<ExtArgs> = {}>(args?: Subset<T, Lead$remindersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assignedTo<T extends Lead$assignedToArgs<ExtArgs> = {}>(args?: Subset<T, Lead$assignedToArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    referredByLead<T extends Lead$referredByLeadArgs<ExtArgs> = {}>(args?: Subset<T, Lead$referredByLeadArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    referrals<T extends Lead$referralsArgs<ExtArgs> = {}>(args?: Subset<T, Lead$referralsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Lead model
   */
  interface LeadFieldRefs {
    readonly id: FieldRef<"Lead", 'String'>
    readonly createdAt: FieldRef<"Lead", 'DateTime'>
    readonly updatedAt: FieldRef<"Lead", 'DateTime'>
    readonly business: FieldRef<"Lead", 'String'>
    readonly primaryLocationId: FieldRef<"Lead", 'String'>
    readonly industryId: FieldRef<"Lead", 'String'>
    readonly businessTypeId: FieldRef<"Lead", 'String'>
    readonly igHandle: FieldRef<"Lead", 'String'>
    readonly igFollowerCount: FieldRef<"Lead", 'Int'>
    readonly email: FieldRef<"Lead", 'String'>
    readonly website: FieldRef<"Lead", 'String'>
    readonly pipelineStage: FieldRef<"Lead", 'PipelineStage'>
    readonly source: FieldRef<"Lead", 'LeadSource'>
    readonly discoveredVia: FieldRef<"Lead", 'DiscoveredVia'>
    readonly discoveredViaOther: FieldRef<"Lead", 'String'>
    readonly convertedAt: FieldRef<"Lead", 'DateTime'>
    readonly isBlackOwned: FieldRef<"Lead", 'Boolean'>
    readonly isWomanOwned: FieldRef<"Lead", 'Boolean'>
    readonly isLatinoOwned: FieldRef<"Lead", 'Boolean'>
    readonly isImmigrantOwned: FieldRef<"Lead", 'Boolean'>
    readonly priority: FieldRef<"Lead", 'Priority'>
    readonly sequenceStep: FieldRef<"Lead", 'Int'>
    readonly sequenceActive: FieldRef<"Lead", 'Boolean'>
    readonly isHot: FieldRef<"Lead", 'Boolean'>
    readonly assignedToId: FieldRef<"Lead", 'String'>
    readonly referredByLeadId: FieldRef<"Lead", 'String'>
    readonly referredByName: FieldRef<"Lead", 'String'>
    readonly instagramHandle: FieldRef<"Lead", 'String'>
    readonly instagramFollowers: FieldRef<"Lead", 'Int'>
    readonly tiktokHandle: FieldRef<"Lead", 'String'>
    readonly tiktokFollowers: FieldRef<"Lead", 'Int'>
    readonly youtubeHandle: FieldRef<"Lead", 'String'>
    readonly youtubeFollowers: FieldRef<"Lead", 'Int'>
    readonly facebookHandle: FieldRef<"Lead", 'String'>
    readonly facebookFollowers: FieldRef<"Lead", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Lead findUnique
   */
  export type LeadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findUniqueOrThrow
   */
  export type LeadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findFirst
   */
  export type LeadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findFirstOrThrow
   */
  export type LeadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findMany
   */
  export type LeadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Leads to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead create
   */
  export type LeadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The data needed to create a Lead.
     */
    data: XOR<LeadCreateInput, LeadUncheckedCreateInput>
  }

  /**
   * Lead createMany
   */
  export type LeadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Leads.
     */
    data: LeadCreateManyInput | LeadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lead createManyAndReturn
   */
  export type LeadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * The data used to create many Leads.
     */
    data: LeadCreateManyInput | LeadCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Lead update
   */
  export type LeadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The data needed to update a Lead.
     */
    data: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
    /**
     * Choose, which Lead to update.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead updateMany
   */
  export type LeadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Leads.
     */
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyInput>
    /**
     * Filter which Leads to update
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to update.
     */
    limit?: number
  }

  /**
   * Lead updateManyAndReturn
   */
  export type LeadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * The data used to update Leads.
     */
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyInput>
    /**
     * Filter which Leads to update
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Lead upsert
   */
  export type LeadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The filter to search for the Lead to update in case it exists.
     */
    where: LeadWhereUniqueInput
    /**
     * In case the Lead found by the `where` argument doesn't exist, create a new Lead with this data.
     */
    create: XOR<LeadCreateInput, LeadUncheckedCreateInput>
    /**
     * In case the Lead was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
  }

  /**
   * Lead delete
   */
  export type LeadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter which Lead to delete.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead deleteMany
   */
  export type LeadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Leads to delete
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to delete.
     */
    limit?: number
  }

  /**
   * Lead.locations
   */
  export type Lead$locationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    where?: LocationWhereInput
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    cursor?: LocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Lead.primaryLocation
   */
  export type Lead$primaryLocationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    where?: LocationWhereInput
  }

  /**
   * Lead.contacts
   */
  export type Lead$contactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    where?: ContactWhereInput
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    cursor?: ContactWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Lead.touchPoint
   */
  export type Lead$touchPointArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TouchPoint
     */
    select?: TouchPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TouchPoint
     */
    omit?: TouchPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TouchPointInclude<ExtArgs> | null
    where?: TouchPointWhereInput
    orderBy?: TouchPointOrderByWithRelationInput | TouchPointOrderByWithRelationInput[]
    cursor?: TouchPointWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TouchPointScalarFieldEnum | TouchPointScalarFieldEnum[]
  }

  /**
   * Lead.notes
   */
  export type Lead$notesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    where?: NoteWhereInput
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    cursor?: NoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Lead.reminders
   */
  export type Lead$remindersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    where?: ReminderWhereInput
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    cursor?: ReminderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReminderScalarFieldEnum | ReminderScalarFieldEnum[]
  }

  /**
   * Lead.assignedTo
   */
  export type Lead$assignedToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Lead.referredByLead
   */
  export type Lead$referredByLeadArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    where?: LeadWhereInput
  }

  /**
   * Lead.referrals
   */
  export type Lead$referralsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    cursor?: LeadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead without action
   */
  export type LeadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
  }


  /**
   * Model Contact
   */

  export type AggregateContact = {
    _count: ContactCountAggregateOutputType | null
    _min: ContactMinAggregateOutputType | null
    _max: ContactMaxAggregateOutputType | null
  }

  export type ContactMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    firstName: string | null
    lastName: string | null
    title: string | null
    email: string | null
    phone: string | null
    isDecisionMaker: boolean | null
    notes: string | null
    leadId: string | null
  }

  export type ContactMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    firstName: string | null
    lastName: string | null
    title: string | null
    email: string | null
    phone: string | null
    isDecisionMaker: boolean | null
    notes: string | null
    leadId: string | null
  }

  export type ContactCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    firstName: number
    lastName: number
    title: number
    email: number
    phone: number
    isDecisionMaker: number
    notes: number
    leadId: number
    _all: number
  }


  export type ContactMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    firstName?: true
    lastName?: true
    title?: true
    email?: true
    phone?: true
    isDecisionMaker?: true
    notes?: true
    leadId?: true
  }

  export type ContactMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    firstName?: true
    lastName?: true
    title?: true
    email?: true
    phone?: true
    isDecisionMaker?: true
    notes?: true
    leadId?: true
  }

  export type ContactCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    firstName?: true
    lastName?: true
    title?: true
    email?: true
    phone?: true
    isDecisionMaker?: true
    notes?: true
    leadId?: true
    _all?: true
  }

  export type ContactAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contact to aggregate.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contacts
    **/
    _count?: true | ContactCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactMaxAggregateInputType
  }

  export type GetContactAggregateType<T extends ContactAggregateArgs> = {
        [P in keyof T & keyof AggregateContact]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContact[P]>
      : GetScalarType<T[P], AggregateContact[P]>
  }




  export type ContactGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactWhereInput
    orderBy?: ContactOrderByWithAggregationInput | ContactOrderByWithAggregationInput[]
    by: ContactScalarFieldEnum[] | ContactScalarFieldEnum
    having?: ContactScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactCountAggregateInputType | true
    _min?: ContactMinAggregateInputType
    _max?: ContactMaxAggregateInputType
  }

  export type ContactGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    firstName: string
    lastName: string
    title: string | null
    email: string | null
    phone: string | null
    isDecisionMaker: boolean
    notes: string | null
    leadId: string
    _count: ContactCountAggregateOutputType | null
    _min: ContactMinAggregateOutputType | null
    _max: ContactMaxAggregateOutputType | null
  }

  type GetContactGroupByPayload<T extends ContactGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactGroupByOutputType[P]>
            : GetScalarType<T[P], ContactGroupByOutputType[P]>
        }
      >
    >


  export type ContactSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    lastName?: boolean
    title?: boolean
    email?: boolean
    phone?: boolean
    isDecisionMaker?: boolean
    notes?: boolean
    leadId?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contact"]>

  export type ContactSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    lastName?: boolean
    title?: boolean
    email?: boolean
    phone?: boolean
    isDecisionMaker?: boolean
    notes?: boolean
    leadId?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contact"]>

  export type ContactSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    lastName?: boolean
    title?: boolean
    email?: boolean
    phone?: boolean
    isDecisionMaker?: boolean
    notes?: boolean
    leadId?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contact"]>

  export type ContactSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    lastName?: boolean
    title?: boolean
    email?: boolean
    phone?: boolean
    isDecisionMaker?: boolean
    notes?: boolean
    leadId?: boolean
  }

  export type ContactOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "firstName" | "lastName" | "title" | "email" | "phone" | "isDecisionMaker" | "notes" | "leadId", ExtArgs["result"]["contact"]>
  export type ContactInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }
  export type ContactIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }
  export type ContactIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }

  export type $ContactPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Contact"
    objects: {
      lead: Prisma.$LeadPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      firstName: string
      lastName: string
      title: string | null
      email: string | null
      phone: string | null
      isDecisionMaker: boolean
      notes: string | null
      leadId: string
    }, ExtArgs["result"]["contact"]>
    composites: {}
  }

  type ContactGetPayload<S extends boolean | null | undefined | ContactDefaultArgs> = $Result.GetResult<Prisma.$ContactPayload, S>

  type ContactCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContactFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContactCountAggregateInputType | true
    }

  export interface ContactDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Contact'], meta: { name: 'Contact' } }
    /**
     * Find zero or one Contact that matches the filter.
     * @param {ContactFindUniqueArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactFindUniqueArgs>(args: SelectSubset<T, ContactFindUniqueArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Contact that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContactFindUniqueOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactFindUniqueOrThrowArgs>(args: SelectSubset<T, ContactFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contact that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactFindFirstArgs>(args?: SelectSubset<T, ContactFindFirstArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contact that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactFindFirstOrThrowArgs>(args?: SelectSubset<T, ContactFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Contacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contacts
     * const contacts = await prisma.contact.findMany()
     * 
     * // Get first 10 Contacts
     * const contacts = await prisma.contact.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactWithIdOnly = await prisma.contact.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContactFindManyArgs>(args?: SelectSubset<T, ContactFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Contact.
     * @param {ContactCreateArgs} args - Arguments to create a Contact.
     * @example
     * // Create one Contact
     * const Contact = await prisma.contact.create({
     *   data: {
     *     // ... data to create a Contact
     *   }
     * })
     * 
     */
    create<T extends ContactCreateArgs>(args: SelectSubset<T, ContactCreateArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Contacts.
     * @param {ContactCreateManyArgs} args - Arguments to create many Contacts.
     * @example
     * // Create many Contacts
     * const contact = await prisma.contact.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContactCreateManyArgs>(args?: SelectSubset<T, ContactCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Contacts and returns the data saved in the database.
     * @param {ContactCreateManyAndReturnArgs} args - Arguments to create many Contacts.
     * @example
     * // Create many Contacts
     * const contact = await prisma.contact.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Contacts and only return the `id`
     * const contactWithIdOnly = await prisma.contact.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContactCreateManyAndReturnArgs>(args?: SelectSubset<T, ContactCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Contact.
     * @param {ContactDeleteArgs} args - Arguments to delete one Contact.
     * @example
     * // Delete one Contact
     * const Contact = await prisma.contact.delete({
     *   where: {
     *     // ... filter to delete one Contact
     *   }
     * })
     * 
     */
    delete<T extends ContactDeleteArgs>(args: SelectSubset<T, ContactDeleteArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Contact.
     * @param {ContactUpdateArgs} args - Arguments to update one Contact.
     * @example
     * // Update one Contact
     * const contact = await prisma.contact.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContactUpdateArgs>(args: SelectSubset<T, ContactUpdateArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Contacts.
     * @param {ContactDeleteManyArgs} args - Arguments to filter Contacts to delete.
     * @example
     * // Delete a few Contacts
     * const { count } = await prisma.contact.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContactDeleteManyArgs>(args?: SelectSubset<T, ContactDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contacts
     * const contact = await prisma.contact.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContactUpdateManyArgs>(args: SelectSubset<T, ContactUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contacts and returns the data updated in the database.
     * @param {ContactUpdateManyAndReturnArgs} args - Arguments to update many Contacts.
     * @example
     * // Update many Contacts
     * const contact = await prisma.contact.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Contacts and only return the `id`
     * const contactWithIdOnly = await prisma.contact.updateManyAndReturn({
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
    updateManyAndReturn<T extends ContactUpdateManyAndReturnArgs>(args: SelectSubset<T, ContactUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Contact.
     * @param {ContactUpsertArgs} args - Arguments to update or create a Contact.
     * @example
     * // Update or create a Contact
     * const contact = await prisma.contact.upsert({
     *   create: {
     *     // ... data to create a Contact
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contact we want to update
     *   }
     * })
     */
    upsert<T extends ContactUpsertArgs>(args: SelectSubset<T, ContactUpsertArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactCountArgs} args - Arguments to filter Contacts to count.
     * @example
     * // Count the number of Contacts
     * const count = await prisma.contact.count({
     *   where: {
     *     // ... the filter for the Contacts we want to count
     *   }
     * })
    **/
    count<T extends ContactCountArgs>(
      args?: Subset<T, ContactCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ContactAggregateArgs>(args: Subset<T, ContactAggregateArgs>): Prisma.PrismaPromise<GetContactAggregateType<T>>

    /**
     * Group by Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactGroupByArgs} args - Group by arguments.
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
      T extends ContactGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactGroupByArgs['orderBy'] }
        : { orderBy?: ContactGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ContactGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Contact model
   */
  readonly fields: ContactFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Contact.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends LeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeadDefaultArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Contact model
   */
  interface ContactFieldRefs {
    readonly id: FieldRef<"Contact", 'String'>
    readonly createdAt: FieldRef<"Contact", 'DateTime'>
    readonly updatedAt: FieldRef<"Contact", 'DateTime'>
    readonly firstName: FieldRef<"Contact", 'String'>
    readonly lastName: FieldRef<"Contact", 'String'>
    readonly title: FieldRef<"Contact", 'String'>
    readonly email: FieldRef<"Contact", 'String'>
    readonly phone: FieldRef<"Contact", 'String'>
    readonly isDecisionMaker: FieldRef<"Contact", 'Boolean'>
    readonly notes: FieldRef<"Contact", 'String'>
    readonly leadId: FieldRef<"Contact", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Contact findUnique
   */
  export type ContactFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact findUniqueOrThrow
   */
  export type ContactFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact findFirst
   */
  export type ContactFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contacts.
     */
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact findFirstOrThrow
   */
  export type ContactFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contacts.
     */
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact findMany
   */
  export type ContactFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contacts to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact create
   */
  export type ContactCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * The data needed to create a Contact.
     */
    data: XOR<ContactCreateInput, ContactUncheckedCreateInput>
  }

  /**
   * Contact createMany
   */
  export type ContactCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contacts.
     */
    data: ContactCreateManyInput | ContactCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Contact createManyAndReturn
   */
  export type ContactCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * The data used to create many Contacts.
     */
    data: ContactCreateManyInput | ContactCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Contact update
   */
  export type ContactUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * The data needed to update a Contact.
     */
    data: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>
    /**
     * Choose, which Contact to update.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact updateMany
   */
  export type ContactUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contacts.
     */
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyInput>
    /**
     * Filter which Contacts to update
     */
    where?: ContactWhereInput
    /**
     * Limit how many Contacts to update.
     */
    limit?: number
  }

  /**
   * Contact updateManyAndReturn
   */
  export type ContactUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * The data used to update Contacts.
     */
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyInput>
    /**
     * Filter which Contacts to update
     */
    where?: ContactWhereInput
    /**
     * Limit how many Contacts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Contact upsert
   */
  export type ContactUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * The filter to search for the Contact to update in case it exists.
     */
    where: ContactWhereUniqueInput
    /**
     * In case the Contact found by the `where` argument doesn't exist, create a new Contact with this data.
     */
    create: XOR<ContactCreateInput, ContactUncheckedCreateInput>
    /**
     * In case the Contact was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>
  }

  /**
   * Contact delete
   */
  export type ContactDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter which Contact to delete.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact deleteMany
   */
  export type ContactDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contacts to delete
     */
    where?: ContactWhereInput
    /**
     * Limit how many Contacts to delete.
     */
    limit?: number
  }

  /**
   * Contact without action
   */
  export type ContactDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
  }


  /**
   * Model Industry
   */

  export type AggregateIndustry = {
    _count: IndustryCountAggregateOutputType | null
    _min: IndustryMinAggregateOutputType | null
    _max: IndustryMaxAggregateOutputType | null
  }

  export type IndustryMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
  }

  export type IndustryMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
  }

  export type IndustryCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    name: number
    _all: number
  }


  export type IndustryMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
  }

  export type IndustryMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
  }

  export type IndustryCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    _all?: true
  }

  export type IndustryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Industry to aggregate.
     */
    where?: IndustryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Industries to fetch.
     */
    orderBy?: IndustryOrderByWithRelationInput | IndustryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IndustryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Industries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Industries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Industries
    **/
    _count?: true | IndustryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IndustryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IndustryMaxAggregateInputType
  }

  export type GetIndustryAggregateType<T extends IndustryAggregateArgs> = {
        [P in keyof T & keyof AggregateIndustry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIndustry[P]>
      : GetScalarType<T[P], AggregateIndustry[P]>
  }




  export type IndustryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IndustryWhereInput
    orderBy?: IndustryOrderByWithAggregationInput | IndustryOrderByWithAggregationInput[]
    by: IndustryScalarFieldEnum[] | IndustryScalarFieldEnum
    having?: IndustryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IndustryCountAggregateInputType | true
    _min?: IndustryMinAggregateInputType
    _max?: IndustryMaxAggregateInputType
  }

  export type IndustryGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
    _count: IndustryCountAggregateOutputType | null
    _min: IndustryMinAggregateOutputType | null
    _max: IndustryMaxAggregateOutputType | null
  }

  type GetIndustryGroupByPayload<T extends IndustryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IndustryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IndustryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IndustryGroupByOutputType[P]>
            : GetScalarType<T[P], IndustryGroupByOutputType[P]>
        }
      >
    >


  export type IndustrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    leads?: boolean | Industry$leadsArgs<ExtArgs>
    _count?: boolean | IndustryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["industry"]>

  export type IndustrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
  }, ExtArgs["result"]["industry"]>

  export type IndustrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
  }, ExtArgs["result"]["industry"]>

  export type IndustrySelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
  }

  export type IndustryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "name", ExtArgs["result"]["industry"]>
  export type IndustryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leads?: boolean | Industry$leadsArgs<ExtArgs>
    _count?: boolean | IndustryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type IndustryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type IndustryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $IndustryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Industry"
    objects: {
      leads: Prisma.$LeadPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      name: string
    }, ExtArgs["result"]["industry"]>
    composites: {}
  }

  type IndustryGetPayload<S extends boolean | null | undefined | IndustryDefaultArgs> = $Result.GetResult<Prisma.$IndustryPayload, S>

  type IndustryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IndustryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IndustryCountAggregateInputType | true
    }

  export interface IndustryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Industry'], meta: { name: 'Industry' } }
    /**
     * Find zero or one Industry that matches the filter.
     * @param {IndustryFindUniqueArgs} args - Arguments to find a Industry
     * @example
     * // Get one Industry
     * const industry = await prisma.industry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IndustryFindUniqueArgs>(args: SelectSubset<T, IndustryFindUniqueArgs<ExtArgs>>): Prisma__IndustryClient<$Result.GetResult<Prisma.$IndustryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Industry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IndustryFindUniqueOrThrowArgs} args - Arguments to find a Industry
     * @example
     * // Get one Industry
     * const industry = await prisma.industry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IndustryFindUniqueOrThrowArgs>(args: SelectSubset<T, IndustryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IndustryClient<$Result.GetResult<Prisma.$IndustryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Industry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustryFindFirstArgs} args - Arguments to find a Industry
     * @example
     * // Get one Industry
     * const industry = await prisma.industry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IndustryFindFirstArgs>(args?: SelectSubset<T, IndustryFindFirstArgs<ExtArgs>>): Prisma__IndustryClient<$Result.GetResult<Prisma.$IndustryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Industry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustryFindFirstOrThrowArgs} args - Arguments to find a Industry
     * @example
     * // Get one Industry
     * const industry = await prisma.industry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IndustryFindFirstOrThrowArgs>(args?: SelectSubset<T, IndustryFindFirstOrThrowArgs<ExtArgs>>): Prisma__IndustryClient<$Result.GetResult<Prisma.$IndustryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Industries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Industries
     * const industries = await prisma.industry.findMany()
     * 
     * // Get first 10 Industries
     * const industries = await prisma.industry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const industryWithIdOnly = await prisma.industry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IndustryFindManyArgs>(args?: SelectSubset<T, IndustryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IndustryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Industry.
     * @param {IndustryCreateArgs} args - Arguments to create a Industry.
     * @example
     * // Create one Industry
     * const Industry = await prisma.industry.create({
     *   data: {
     *     // ... data to create a Industry
     *   }
     * })
     * 
     */
    create<T extends IndustryCreateArgs>(args: SelectSubset<T, IndustryCreateArgs<ExtArgs>>): Prisma__IndustryClient<$Result.GetResult<Prisma.$IndustryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Industries.
     * @param {IndustryCreateManyArgs} args - Arguments to create many Industries.
     * @example
     * // Create many Industries
     * const industry = await prisma.industry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IndustryCreateManyArgs>(args?: SelectSubset<T, IndustryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Industries and returns the data saved in the database.
     * @param {IndustryCreateManyAndReturnArgs} args - Arguments to create many Industries.
     * @example
     * // Create many Industries
     * const industry = await prisma.industry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Industries and only return the `id`
     * const industryWithIdOnly = await prisma.industry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IndustryCreateManyAndReturnArgs>(args?: SelectSubset<T, IndustryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IndustryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Industry.
     * @param {IndustryDeleteArgs} args - Arguments to delete one Industry.
     * @example
     * // Delete one Industry
     * const Industry = await prisma.industry.delete({
     *   where: {
     *     // ... filter to delete one Industry
     *   }
     * })
     * 
     */
    delete<T extends IndustryDeleteArgs>(args: SelectSubset<T, IndustryDeleteArgs<ExtArgs>>): Prisma__IndustryClient<$Result.GetResult<Prisma.$IndustryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Industry.
     * @param {IndustryUpdateArgs} args - Arguments to update one Industry.
     * @example
     * // Update one Industry
     * const industry = await prisma.industry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IndustryUpdateArgs>(args: SelectSubset<T, IndustryUpdateArgs<ExtArgs>>): Prisma__IndustryClient<$Result.GetResult<Prisma.$IndustryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Industries.
     * @param {IndustryDeleteManyArgs} args - Arguments to filter Industries to delete.
     * @example
     * // Delete a few Industries
     * const { count } = await prisma.industry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IndustryDeleteManyArgs>(args?: SelectSubset<T, IndustryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Industries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Industries
     * const industry = await prisma.industry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IndustryUpdateManyArgs>(args: SelectSubset<T, IndustryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Industries and returns the data updated in the database.
     * @param {IndustryUpdateManyAndReturnArgs} args - Arguments to update many Industries.
     * @example
     * // Update many Industries
     * const industry = await prisma.industry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Industries and only return the `id`
     * const industryWithIdOnly = await prisma.industry.updateManyAndReturn({
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
    updateManyAndReturn<T extends IndustryUpdateManyAndReturnArgs>(args: SelectSubset<T, IndustryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IndustryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Industry.
     * @param {IndustryUpsertArgs} args - Arguments to update or create a Industry.
     * @example
     * // Update or create a Industry
     * const industry = await prisma.industry.upsert({
     *   create: {
     *     // ... data to create a Industry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Industry we want to update
     *   }
     * })
     */
    upsert<T extends IndustryUpsertArgs>(args: SelectSubset<T, IndustryUpsertArgs<ExtArgs>>): Prisma__IndustryClient<$Result.GetResult<Prisma.$IndustryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Industries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustryCountArgs} args - Arguments to filter Industries to count.
     * @example
     * // Count the number of Industries
     * const count = await prisma.industry.count({
     *   where: {
     *     // ... the filter for the Industries we want to count
     *   }
     * })
    **/
    count<T extends IndustryCountArgs>(
      args?: Subset<T, IndustryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IndustryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Industry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends IndustryAggregateArgs>(args: Subset<T, IndustryAggregateArgs>): Prisma.PrismaPromise<GetIndustryAggregateType<T>>

    /**
     * Group by Industry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustryGroupByArgs} args - Group by arguments.
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
      T extends IndustryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IndustryGroupByArgs['orderBy'] }
        : { orderBy?: IndustryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, IndustryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIndustryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Industry model
   */
  readonly fields: IndustryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Industry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IndustryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    leads<T extends Industry$leadsArgs<ExtArgs> = {}>(args?: Subset<T, Industry$leadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Industry model
   */
  interface IndustryFieldRefs {
    readonly id: FieldRef<"Industry", 'String'>
    readonly createdAt: FieldRef<"Industry", 'DateTime'>
    readonly updatedAt: FieldRef<"Industry", 'DateTime'>
    readonly name: FieldRef<"Industry", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Industry findUnique
   */
  export type IndustryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Industry
     */
    select?: IndustrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Industry
     */
    omit?: IndustryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndustryInclude<ExtArgs> | null
    /**
     * Filter, which Industry to fetch.
     */
    where: IndustryWhereUniqueInput
  }

  /**
   * Industry findUniqueOrThrow
   */
  export type IndustryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Industry
     */
    select?: IndustrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Industry
     */
    omit?: IndustryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndustryInclude<ExtArgs> | null
    /**
     * Filter, which Industry to fetch.
     */
    where: IndustryWhereUniqueInput
  }

  /**
   * Industry findFirst
   */
  export type IndustryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Industry
     */
    select?: IndustrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Industry
     */
    omit?: IndustryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndustryInclude<ExtArgs> | null
    /**
     * Filter, which Industry to fetch.
     */
    where?: IndustryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Industries to fetch.
     */
    orderBy?: IndustryOrderByWithRelationInput | IndustryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Industries.
     */
    cursor?: IndustryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Industries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Industries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Industries.
     */
    distinct?: IndustryScalarFieldEnum | IndustryScalarFieldEnum[]
  }

  /**
   * Industry findFirstOrThrow
   */
  export type IndustryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Industry
     */
    select?: IndustrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Industry
     */
    omit?: IndustryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndustryInclude<ExtArgs> | null
    /**
     * Filter, which Industry to fetch.
     */
    where?: IndustryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Industries to fetch.
     */
    orderBy?: IndustryOrderByWithRelationInput | IndustryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Industries.
     */
    cursor?: IndustryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Industries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Industries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Industries.
     */
    distinct?: IndustryScalarFieldEnum | IndustryScalarFieldEnum[]
  }

  /**
   * Industry findMany
   */
  export type IndustryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Industry
     */
    select?: IndustrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Industry
     */
    omit?: IndustryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndustryInclude<ExtArgs> | null
    /**
     * Filter, which Industries to fetch.
     */
    where?: IndustryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Industries to fetch.
     */
    orderBy?: IndustryOrderByWithRelationInput | IndustryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Industries.
     */
    cursor?: IndustryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Industries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Industries.
     */
    skip?: number
    distinct?: IndustryScalarFieldEnum | IndustryScalarFieldEnum[]
  }

  /**
   * Industry create
   */
  export type IndustryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Industry
     */
    select?: IndustrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Industry
     */
    omit?: IndustryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndustryInclude<ExtArgs> | null
    /**
     * The data needed to create a Industry.
     */
    data: XOR<IndustryCreateInput, IndustryUncheckedCreateInput>
  }

  /**
   * Industry createMany
   */
  export type IndustryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Industries.
     */
    data: IndustryCreateManyInput | IndustryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Industry createManyAndReturn
   */
  export type IndustryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Industry
     */
    select?: IndustrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Industry
     */
    omit?: IndustryOmit<ExtArgs> | null
    /**
     * The data used to create many Industries.
     */
    data: IndustryCreateManyInput | IndustryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Industry update
   */
  export type IndustryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Industry
     */
    select?: IndustrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Industry
     */
    omit?: IndustryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndustryInclude<ExtArgs> | null
    /**
     * The data needed to update a Industry.
     */
    data: XOR<IndustryUpdateInput, IndustryUncheckedUpdateInput>
    /**
     * Choose, which Industry to update.
     */
    where: IndustryWhereUniqueInput
  }

  /**
   * Industry updateMany
   */
  export type IndustryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Industries.
     */
    data: XOR<IndustryUpdateManyMutationInput, IndustryUncheckedUpdateManyInput>
    /**
     * Filter which Industries to update
     */
    where?: IndustryWhereInput
    /**
     * Limit how many Industries to update.
     */
    limit?: number
  }

  /**
   * Industry updateManyAndReturn
   */
  export type IndustryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Industry
     */
    select?: IndustrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Industry
     */
    omit?: IndustryOmit<ExtArgs> | null
    /**
     * The data used to update Industries.
     */
    data: XOR<IndustryUpdateManyMutationInput, IndustryUncheckedUpdateManyInput>
    /**
     * Filter which Industries to update
     */
    where?: IndustryWhereInput
    /**
     * Limit how many Industries to update.
     */
    limit?: number
  }

  /**
   * Industry upsert
   */
  export type IndustryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Industry
     */
    select?: IndustrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Industry
     */
    omit?: IndustryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndustryInclude<ExtArgs> | null
    /**
     * The filter to search for the Industry to update in case it exists.
     */
    where: IndustryWhereUniqueInput
    /**
     * In case the Industry found by the `where` argument doesn't exist, create a new Industry with this data.
     */
    create: XOR<IndustryCreateInput, IndustryUncheckedCreateInput>
    /**
     * In case the Industry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IndustryUpdateInput, IndustryUncheckedUpdateInput>
  }

  /**
   * Industry delete
   */
  export type IndustryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Industry
     */
    select?: IndustrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Industry
     */
    omit?: IndustryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndustryInclude<ExtArgs> | null
    /**
     * Filter which Industry to delete.
     */
    where: IndustryWhereUniqueInput
  }

  /**
   * Industry deleteMany
   */
  export type IndustryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Industries to delete
     */
    where?: IndustryWhereInput
    /**
     * Limit how many Industries to delete.
     */
    limit?: number
  }

  /**
   * Industry.leads
   */
  export type Industry$leadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    cursor?: LeadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Industry without action
   */
  export type IndustryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Industry
     */
    select?: IndustrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Industry
     */
    omit?: IndustryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndustryInclude<ExtArgs> | null
  }


  /**
   * Model BusinessType
   */

  export type AggregateBusinessType = {
    _count: BusinessTypeCountAggregateOutputType | null
    _min: BusinessTypeMinAggregateOutputType | null
    _max: BusinessTypeMaxAggregateOutputType | null
  }

  export type BusinessTypeMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
  }

  export type BusinessTypeMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
  }

  export type BusinessTypeCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    name: number
    _all: number
  }


  export type BusinessTypeMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
  }

  export type BusinessTypeMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
  }

  export type BusinessTypeCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    _all?: true
  }

  export type BusinessTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BusinessType to aggregate.
     */
    where?: BusinessTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessTypes to fetch.
     */
    orderBy?: BusinessTypeOrderByWithRelationInput | BusinessTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BusinessTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BusinessTypes
    **/
    _count?: true | BusinessTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BusinessTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BusinessTypeMaxAggregateInputType
  }

  export type GetBusinessTypeAggregateType<T extends BusinessTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateBusinessType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBusinessType[P]>
      : GetScalarType<T[P], AggregateBusinessType[P]>
  }




  export type BusinessTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusinessTypeWhereInput
    orderBy?: BusinessTypeOrderByWithAggregationInput | BusinessTypeOrderByWithAggregationInput[]
    by: BusinessTypeScalarFieldEnum[] | BusinessTypeScalarFieldEnum
    having?: BusinessTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BusinessTypeCountAggregateInputType | true
    _min?: BusinessTypeMinAggregateInputType
    _max?: BusinessTypeMaxAggregateInputType
  }

  export type BusinessTypeGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
    _count: BusinessTypeCountAggregateOutputType | null
    _min: BusinessTypeMinAggregateOutputType | null
    _max: BusinessTypeMaxAggregateOutputType | null
  }

  type GetBusinessTypeGroupByPayload<T extends BusinessTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BusinessTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BusinessTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BusinessTypeGroupByOutputType[P]>
            : GetScalarType<T[P], BusinessTypeGroupByOutputType[P]>
        }
      >
    >


  export type BusinessTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    leads?: boolean | BusinessType$leadsArgs<ExtArgs>
    _count?: boolean | BusinessTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["businessType"]>

  export type BusinessTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
  }, ExtArgs["result"]["businessType"]>

  export type BusinessTypeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
  }, ExtArgs["result"]["businessType"]>

  export type BusinessTypeSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
  }

  export type BusinessTypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "name", ExtArgs["result"]["businessType"]>
  export type BusinessTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leads?: boolean | BusinessType$leadsArgs<ExtArgs>
    _count?: boolean | BusinessTypeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BusinessTypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BusinessTypeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BusinessTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BusinessType"
    objects: {
      leads: Prisma.$LeadPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      name: string
    }, ExtArgs["result"]["businessType"]>
    composites: {}
  }

  type BusinessTypeGetPayload<S extends boolean | null | undefined | BusinessTypeDefaultArgs> = $Result.GetResult<Prisma.$BusinessTypePayload, S>

  type BusinessTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BusinessTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BusinessTypeCountAggregateInputType | true
    }

  export interface BusinessTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BusinessType'], meta: { name: 'BusinessType' } }
    /**
     * Find zero or one BusinessType that matches the filter.
     * @param {BusinessTypeFindUniqueArgs} args - Arguments to find a BusinessType
     * @example
     * // Get one BusinessType
     * const businessType = await prisma.businessType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BusinessTypeFindUniqueArgs>(args: SelectSubset<T, BusinessTypeFindUniqueArgs<ExtArgs>>): Prisma__BusinessTypeClient<$Result.GetResult<Prisma.$BusinessTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BusinessType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BusinessTypeFindUniqueOrThrowArgs} args - Arguments to find a BusinessType
     * @example
     * // Get one BusinessType
     * const businessType = await prisma.businessType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BusinessTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, BusinessTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BusinessTypeClient<$Result.GetResult<Prisma.$BusinessTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BusinessType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessTypeFindFirstArgs} args - Arguments to find a BusinessType
     * @example
     * // Get one BusinessType
     * const businessType = await prisma.businessType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BusinessTypeFindFirstArgs>(args?: SelectSubset<T, BusinessTypeFindFirstArgs<ExtArgs>>): Prisma__BusinessTypeClient<$Result.GetResult<Prisma.$BusinessTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BusinessType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessTypeFindFirstOrThrowArgs} args - Arguments to find a BusinessType
     * @example
     * // Get one BusinessType
     * const businessType = await prisma.businessType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BusinessTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, BusinessTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__BusinessTypeClient<$Result.GetResult<Prisma.$BusinessTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BusinessTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BusinessTypes
     * const businessTypes = await prisma.businessType.findMany()
     * 
     * // Get first 10 BusinessTypes
     * const businessTypes = await prisma.businessType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const businessTypeWithIdOnly = await prisma.businessType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BusinessTypeFindManyArgs>(args?: SelectSubset<T, BusinessTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BusinessType.
     * @param {BusinessTypeCreateArgs} args - Arguments to create a BusinessType.
     * @example
     * // Create one BusinessType
     * const BusinessType = await prisma.businessType.create({
     *   data: {
     *     // ... data to create a BusinessType
     *   }
     * })
     * 
     */
    create<T extends BusinessTypeCreateArgs>(args: SelectSubset<T, BusinessTypeCreateArgs<ExtArgs>>): Prisma__BusinessTypeClient<$Result.GetResult<Prisma.$BusinessTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BusinessTypes.
     * @param {BusinessTypeCreateManyArgs} args - Arguments to create many BusinessTypes.
     * @example
     * // Create many BusinessTypes
     * const businessType = await prisma.businessType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BusinessTypeCreateManyArgs>(args?: SelectSubset<T, BusinessTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BusinessTypes and returns the data saved in the database.
     * @param {BusinessTypeCreateManyAndReturnArgs} args - Arguments to create many BusinessTypes.
     * @example
     * // Create many BusinessTypes
     * const businessType = await prisma.businessType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BusinessTypes and only return the `id`
     * const businessTypeWithIdOnly = await prisma.businessType.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BusinessTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, BusinessTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BusinessType.
     * @param {BusinessTypeDeleteArgs} args - Arguments to delete one BusinessType.
     * @example
     * // Delete one BusinessType
     * const BusinessType = await prisma.businessType.delete({
     *   where: {
     *     // ... filter to delete one BusinessType
     *   }
     * })
     * 
     */
    delete<T extends BusinessTypeDeleteArgs>(args: SelectSubset<T, BusinessTypeDeleteArgs<ExtArgs>>): Prisma__BusinessTypeClient<$Result.GetResult<Prisma.$BusinessTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BusinessType.
     * @param {BusinessTypeUpdateArgs} args - Arguments to update one BusinessType.
     * @example
     * // Update one BusinessType
     * const businessType = await prisma.businessType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BusinessTypeUpdateArgs>(args: SelectSubset<T, BusinessTypeUpdateArgs<ExtArgs>>): Prisma__BusinessTypeClient<$Result.GetResult<Prisma.$BusinessTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BusinessTypes.
     * @param {BusinessTypeDeleteManyArgs} args - Arguments to filter BusinessTypes to delete.
     * @example
     * // Delete a few BusinessTypes
     * const { count } = await prisma.businessType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BusinessTypeDeleteManyArgs>(args?: SelectSubset<T, BusinessTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BusinessTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BusinessTypes
     * const businessType = await prisma.businessType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BusinessTypeUpdateManyArgs>(args: SelectSubset<T, BusinessTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BusinessTypes and returns the data updated in the database.
     * @param {BusinessTypeUpdateManyAndReturnArgs} args - Arguments to update many BusinessTypes.
     * @example
     * // Update many BusinessTypes
     * const businessType = await prisma.businessType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BusinessTypes and only return the `id`
     * const businessTypeWithIdOnly = await prisma.businessType.updateManyAndReturn({
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
    updateManyAndReturn<T extends BusinessTypeUpdateManyAndReturnArgs>(args: SelectSubset<T, BusinessTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BusinessType.
     * @param {BusinessTypeUpsertArgs} args - Arguments to update or create a BusinessType.
     * @example
     * // Update or create a BusinessType
     * const businessType = await prisma.businessType.upsert({
     *   create: {
     *     // ... data to create a BusinessType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BusinessType we want to update
     *   }
     * })
     */
    upsert<T extends BusinessTypeUpsertArgs>(args: SelectSubset<T, BusinessTypeUpsertArgs<ExtArgs>>): Prisma__BusinessTypeClient<$Result.GetResult<Prisma.$BusinessTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BusinessTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessTypeCountArgs} args - Arguments to filter BusinessTypes to count.
     * @example
     * // Count the number of BusinessTypes
     * const count = await prisma.businessType.count({
     *   where: {
     *     // ... the filter for the BusinessTypes we want to count
     *   }
     * })
    **/
    count<T extends BusinessTypeCountArgs>(
      args?: Subset<T, BusinessTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BusinessTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BusinessType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BusinessTypeAggregateArgs>(args: Subset<T, BusinessTypeAggregateArgs>): Prisma.PrismaPromise<GetBusinessTypeAggregateType<T>>

    /**
     * Group by BusinessType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessTypeGroupByArgs} args - Group by arguments.
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
      T extends BusinessTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BusinessTypeGroupByArgs['orderBy'] }
        : { orderBy?: BusinessTypeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BusinessTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBusinessTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BusinessType model
   */
  readonly fields: BusinessTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BusinessType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BusinessTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    leads<T extends BusinessType$leadsArgs<ExtArgs> = {}>(args?: Subset<T, BusinessType$leadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the BusinessType model
   */
  interface BusinessTypeFieldRefs {
    readonly id: FieldRef<"BusinessType", 'String'>
    readonly createdAt: FieldRef<"BusinessType", 'DateTime'>
    readonly updatedAt: FieldRef<"BusinessType", 'DateTime'>
    readonly name: FieldRef<"BusinessType", 'String'>
  }
    

  // Custom InputTypes
  /**
   * BusinessType findUnique
   */
  export type BusinessTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessType
     */
    select?: BusinessTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessType
     */
    omit?: BusinessTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessTypeInclude<ExtArgs> | null
    /**
     * Filter, which BusinessType to fetch.
     */
    where: BusinessTypeWhereUniqueInput
  }

  /**
   * BusinessType findUniqueOrThrow
   */
  export type BusinessTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessType
     */
    select?: BusinessTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessType
     */
    omit?: BusinessTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessTypeInclude<ExtArgs> | null
    /**
     * Filter, which BusinessType to fetch.
     */
    where: BusinessTypeWhereUniqueInput
  }

  /**
   * BusinessType findFirst
   */
  export type BusinessTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessType
     */
    select?: BusinessTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessType
     */
    omit?: BusinessTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessTypeInclude<ExtArgs> | null
    /**
     * Filter, which BusinessType to fetch.
     */
    where?: BusinessTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessTypes to fetch.
     */
    orderBy?: BusinessTypeOrderByWithRelationInput | BusinessTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BusinessTypes.
     */
    cursor?: BusinessTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusinessTypes.
     */
    distinct?: BusinessTypeScalarFieldEnum | BusinessTypeScalarFieldEnum[]
  }

  /**
   * BusinessType findFirstOrThrow
   */
  export type BusinessTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessType
     */
    select?: BusinessTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessType
     */
    omit?: BusinessTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessTypeInclude<ExtArgs> | null
    /**
     * Filter, which BusinessType to fetch.
     */
    where?: BusinessTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessTypes to fetch.
     */
    orderBy?: BusinessTypeOrderByWithRelationInput | BusinessTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BusinessTypes.
     */
    cursor?: BusinessTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusinessTypes.
     */
    distinct?: BusinessTypeScalarFieldEnum | BusinessTypeScalarFieldEnum[]
  }

  /**
   * BusinessType findMany
   */
  export type BusinessTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessType
     */
    select?: BusinessTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessType
     */
    omit?: BusinessTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessTypeInclude<ExtArgs> | null
    /**
     * Filter, which BusinessTypes to fetch.
     */
    where?: BusinessTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessTypes to fetch.
     */
    orderBy?: BusinessTypeOrderByWithRelationInput | BusinessTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BusinessTypes.
     */
    cursor?: BusinessTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessTypes.
     */
    skip?: number
    distinct?: BusinessTypeScalarFieldEnum | BusinessTypeScalarFieldEnum[]
  }

  /**
   * BusinessType create
   */
  export type BusinessTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessType
     */
    select?: BusinessTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessType
     */
    omit?: BusinessTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a BusinessType.
     */
    data: XOR<BusinessTypeCreateInput, BusinessTypeUncheckedCreateInput>
  }

  /**
   * BusinessType createMany
   */
  export type BusinessTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BusinessTypes.
     */
    data: BusinessTypeCreateManyInput | BusinessTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BusinessType createManyAndReturn
   */
  export type BusinessTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessType
     */
    select?: BusinessTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessType
     */
    omit?: BusinessTypeOmit<ExtArgs> | null
    /**
     * The data used to create many BusinessTypes.
     */
    data: BusinessTypeCreateManyInput | BusinessTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BusinessType update
   */
  export type BusinessTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessType
     */
    select?: BusinessTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessType
     */
    omit?: BusinessTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a BusinessType.
     */
    data: XOR<BusinessTypeUpdateInput, BusinessTypeUncheckedUpdateInput>
    /**
     * Choose, which BusinessType to update.
     */
    where: BusinessTypeWhereUniqueInput
  }

  /**
   * BusinessType updateMany
   */
  export type BusinessTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BusinessTypes.
     */
    data: XOR<BusinessTypeUpdateManyMutationInput, BusinessTypeUncheckedUpdateManyInput>
    /**
     * Filter which BusinessTypes to update
     */
    where?: BusinessTypeWhereInput
    /**
     * Limit how many BusinessTypes to update.
     */
    limit?: number
  }

  /**
   * BusinessType updateManyAndReturn
   */
  export type BusinessTypeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessType
     */
    select?: BusinessTypeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessType
     */
    omit?: BusinessTypeOmit<ExtArgs> | null
    /**
     * The data used to update BusinessTypes.
     */
    data: XOR<BusinessTypeUpdateManyMutationInput, BusinessTypeUncheckedUpdateManyInput>
    /**
     * Filter which BusinessTypes to update
     */
    where?: BusinessTypeWhereInput
    /**
     * Limit how many BusinessTypes to update.
     */
    limit?: number
  }

  /**
   * BusinessType upsert
   */
  export type BusinessTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessType
     */
    select?: BusinessTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessType
     */
    omit?: BusinessTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the BusinessType to update in case it exists.
     */
    where: BusinessTypeWhereUniqueInput
    /**
     * In case the BusinessType found by the `where` argument doesn't exist, create a new BusinessType with this data.
     */
    create: XOR<BusinessTypeCreateInput, BusinessTypeUncheckedCreateInput>
    /**
     * In case the BusinessType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BusinessTypeUpdateInput, BusinessTypeUncheckedUpdateInput>
  }

  /**
   * BusinessType delete
   */
  export type BusinessTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessType
     */
    select?: BusinessTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessType
     */
    omit?: BusinessTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessTypeInclude<ExtArgs> | null
    /**
     * Filter which BusinessType to delete.
     */
    where: BusinessTypeWhereUniqueInput
  }

  /**
   * BusinessType deleteMany
   */
  export type BusinessTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BusinessTypes to delete
     */
    where?: BusinessTypeWhereInput
    /**
     * Limit how many BusinessTypes to delete.
     */
    limit?: number
  }

  /**
   * BusinessType.leads
   */
  export type BusinessType$leadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    cursor?: LeadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * BusinessType without action
   */
  export type BusinessTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessType
     */
    select?: BusinessTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessType
     */
    omit?: BusinessTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessTypeInclude<ExtArgs> | null
  }


  /**
   * Model Location
   */

  export type AggregateLocation = {
    _count: LocationCountAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  export type LocationMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    businessId: string | null
    addressLine1: string | null
    addressLine2: string | null
    city: string | null
    state: string | null
    zip: string | null
  }

  export type LocationMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    businessId: string | null
    addressLine1: string | null
    addressLine2: string | null
    city: string | null
    state: string | null
    zip: string | null
  }

  export type LocationCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    businessId: number
    addressLine1: number
    addressLine2: number
    city: number
    state: number
    zip: number
    _all: number
  }


  export type LocationMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    businessId?: true
    addressLine1?: true
    addressLine2?: true
    city?: true
    state?: true
    zip?: true
  }

  export type LocationMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    businessId?: true
    addressLine1?: true
    addressLine2?: true
    city?: true
    state?: true
    zip?: true
  }

  export type LocationCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    businessId?: true
    addressLine1?: true
    addressLine2?: true
    city?: true
    state?: true
    zip?: true
    _all?: true
  }

  export type LocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Location to aggregate.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Locations
    **/
    _count?: true | LocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocationMaxAggregateInputType
  }

  export type GetLocationAggregateType<T extends LocationAggregateArgs> = {
        [P in keyof T & keyof AggregateLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocation[P]>
      : GetScalarType<T[P], AggregateLocation[P]>
  }




  export type LocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationWhereInput
    orderBy?: LocationOrderByWithAggregationInput | LocationOrderByWithAggregationInput[]
    by: LocationScalarFieldEnum[] | LocationScalarFieldEnum
    having?: LocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocationCountAggregateInputType | true
    _min?: LocationMinAggregateInputType
    _max?: LocationMaxAggregateInputType
  }

  export type LocationGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    businessId: string
    addressLine1: string
    addressLine2: string | null
    city: string
    state: string
    zip: string
    _count: LocationCountAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  type GetLocationGroupByPayload<T extends LocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocationGroupByOutputType[P]>
            : GetScalarType<T[P], LocationGroupByOutputType[P]>
        }
      >
    >


  export type LocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    businessId?: boolean
    addressLine1?: boolean
    addressLine2?: boolean
    city?: boolean
    state?: boolean
    zip?: boolean
    business?: boolean | LeadDefaultArgs<ExtArgs>
    phoneNumbers?: boolean | Location$phoneNumbersArgs<ExtArgs>
    primaryForBusiness?: boolean | Location$primaryForBusinessArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    businessId?: boolean
    addressLine1?: boolean
    addressLine2?: boolean
    city?: boolean
    state?: boolean
    zip?: boolean
    business?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    businessId?: boolean
    addressLine1?: boolean
    addressLine2?: boolean
    city?: boolean
    state?: boolean
    zip?: boolean
    business?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    businessId?: boolean
    addressLine1?: boolean
    addressLine2?: boolean
    city?: boolean
    state?: boolean
    zip?: boolean
  }

  export type LocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "businessId" | "addressLine1" | "addressLine2" | "city" | "state" | "zip", ExtArgs["result"]["location"]>
  export type LocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    business?: boolean | LeadDefaultArgs<ExtArgs>
    phoneNumbers?: boolean | Location$phoneNumbersArgs<ExtArgs>
    primaryForBusiness?: boolean | Location$primaryForBusinessArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    business?: boolean | LeadDefaultArgs<ExtArgs>
  }
  export type LocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    business?: boolean | LeadDefaultArgs<ExtArgs>
  }

  export type $LocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Location"
    objects: {
      business: Prisma.$LeadPayload<ExtArgs>
      phoneNumbers: Prisma.$PhoneNumberPayload<ExtArgs>[]
      primaryForBusiness: Prisma.$LeadPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      businessId: string
      addressLine1: string
      addressLine2: string | null
      city: string
      state: string
      zip: string
    }, ExtArgs["result"]["location"]>
    composites: {}
  }

  type LocationGetPayload<S extends boolean | null | undefined | LocationDefaultArgs> = $Result.GetResult<Prisma.$LocationPayload, S>

  type LocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LocationCountAggregateInputType | true
    }

  export interface LocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Location'], meta: { name: 'Location' } }
    /**
     * Find zero or one Location that matches the filter.
     * @param {LocationFindUniqueArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocationFindUniqueArgs>(args: SelectSubset<T, LocationFindUniqueArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Location that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LocationFindUniqueOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocationFindUniqueOrThrowArgs>(args: SelectSubset<T, LocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocationFindFirstArgs>(args?: SelectSubset<T, LocationFindFirstArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocationFindFirstOrThrowArgs>(args?: SelectSubset<T, LocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Locations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Locations
     * const locations = await prisma.location.findMany()
     * 
     * // Get first 10 Locations
     * const locations = await prisma.location.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const locationWithIdOnly = await prisma.location.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LocationFindManyArgs>(args?: SelectSubset<T, LocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Location.
     * @param {LocationCreateArgs} args - Arguments to create a Location.
     * @example
     * // Create one Location
     * const Location = await prisma.location.create({
     *   data: {
     *     // ... data to create a Location
     *   }
     * })
     * 
     */
    create<T extends LocationCreateArgs>(args: SelectSubset<T, LocationCreateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Locations.
     * @param {LocationCreateManyArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LocationCreateManyArgs>(args?: SelectSubset<T, LocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Locations and returns the data saved in the database.
     * @param {LocationCreateManyAndReturnArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Locations and only return the `id`
     * const locationWithIdOnly = await prisma.location.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LocationCreateManyAndReturnArgs>(args?: SelectSubset<T, LocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Location.
     * @param {LocationDeleteArgs} args - Arguments to delete one Location.
     * @example
     * // Delete one Location
     * const Location = await prisma.location.delete({
     *   where: {
     *     // ... filter to delete one Location
     *   }
     * })
     * 
     */
    delete<T extends LocationDeleteArgs>(args: SelectSubset<T, LocationDeleteArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Location.
     * @param {LocationUpdateArgs} args - Arguments to update one Location.
     * @example
     * // Update one Location
     * const location = await prisma.location.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LocationUpdateArgs>(args: SelectSubset<T, LocationUpdateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Locations.
     * @param {LocationDeleteManyArgs} args - Arguments to filter Locations to delete.
     * @example
     * // Delete a few Locations
     * const { count } = await prisma.location.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LocationDeleteManyArgs>(args?: SelectSubset<T, LocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LocationUpdateManyArgs>(args: SelectSubset<T, LocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations and returns the data updated in the database.
     * @param {LocationUpdateManyAndReturnArgs} args - Arguments to update many Locations.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Locations and only return the `id`
     * const locationWithIdOnly = await prisma.location.updateManyAndReturn({
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
    updateManyAndReturn<T extends LocationUpdateManyAndReturnArgs>(args: SelectSubset<T, LocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Location.
     * @param {LocationUpsertArgs} args - Arguments to update or create a Location.
     * @example
     * // Update or create a Location
     * const location = await prisma.location.upsert({
     *   create: {
     *     // ... data to create a Location
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Location we want to update
     *   }
     * })
     */
    upsert<T extends LocationUpsertArgs>(args: SelectSubset<T, LocationUpsertArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationCountArgs} args - Arguments to filter Locations to count.
     * @example
     * // Count the number of Locations
     * const count = await prisma.location.count({
     *   where: {
     *     // ... the filter for the Locations we want to count
     *   }
     * })
    **/
    count<T extends LocationCountArgs>(
      args?: Subset<T, LocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LocationAggregateArgs>(args: Subset<T, LocationAggregateArgs>): Prisma.PrismaPromise<GetLocationAggregateType<T>>

    /**
     * Group by Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationGroupByArgs} args - Group by arguments.
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
      T extends LocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocationGroupByArgs['orderBy'] }
        : { orderBy?: LocationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Location model
   */
  readonly fields: LocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Location.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    business<T extends LeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeadDefaultArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    phoneNumbers<T extends Location$phoneNumbersArgs<ExtArgs> = {}>(args?: Subset<T, Location$phoneNumbersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhoneNumberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    primaryForBusiness<T extends Location$primaryForBusinessArgs<ExtArgs> = {}>(args?: Subset<T, Location$primaryForBusinessArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Location model
   */
  interface LocationFieldRefs {
    readonly id: FieldRef<"Location", 'String'>
    readonly createdAt: FieldRef<"Location", 'DateTime'>
    readonly updatedAt: FieldRef<"Location", 'DateTime'>
    readonly businessId: FieldRef<"Location", 'String'>
    readonly addressLine1: FieldRef<"Location", 'String'>
    readonly addressLine2: FieldRef<"Location", 'String'>
    readonly city: FieldRef<"Location", 'String'>
    readonly state: FieldRef<"Location", 'String'>
    readonly zip: FieldRef<"Location", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Location findUnique
   */
  export type LocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findUniqueOrThrow
   */
  export type LocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findFirst
   */
  export type LocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findFirstOrThrow
   */
  export type LocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findMany
   */
  export type LocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Locations to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location create
   */
  export type LocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to create a Location.
     */
    data: XOR<LocationCreateInput, LocationUncheckedCreateInput>
  }

  /**
   * Location createMany
   */
  export type LocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Location createManyAndReturn
   */
  export type LocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Location update
   */
  export type LocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to update a Location.
     */
    data: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
    /**
     * Choose, which Location to update.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location updateMany
   */
  export type LocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
  }

  /**
   * Location updateManyAndReturn
   */
  export type LocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Location upsert
   */
  export type LocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The filter to search for the Location to update in case it exists.
     */
    where: LocationWhereUniqueInput
    /**
     * In case the Location found by the `where` argument doesn't exist, create a new Location with this data.
     */
    create: XOR<LocationCreateInput, LocationUncheckedCreateInput>
    /**
     * In case the Location was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
  }

  /**
   * Location delete
   */
  export type LocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter which Location to delete.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location deleteMany
   */
  export type LocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Locations to delete
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to delete.
     */
    limit?: number
  }

  /**
   * Location.phoneNumbers
   */
  export type Location$phoneNumbersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhoneNumber
     */
    select?: PhoneNumberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhoneNumber
     */
    omit?: PhoneNumberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneNumberInclude<ExtArgs> | null
    where?: PhoneNumberWhereInput
    orderBy?: PhoneNumberOrderByWithRelationInput | PhoneNumberOrderByWithRelationInput[]
    cursor?: PhoneNumberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PhoneNumberScalarFieldEnum | PhoneNumberScalarFieldEnum[]
  }

  /**
   * Location.primaryForBusiness
   */
  export type Location$primaryForBusinessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    where?: LeadWhereInput
  }

  /**
   * Location without action
   */
  export type LocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
  }


  /**
   * Model PhoneNumber
   */

  export type AggregatePhoneNumber = {
    _count: PhoneNumberCountAggregateOutputType | null
    _min: PhoneNumberMinAggregateOutputType | null
    _max: PhoneNumberMaxAggregateOutputType | null
  }

  export type PhoneNumberMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    number: string | null
    label: $Enums.PhoneType | null
    locationId: string | null
  }

  export type PhoneNumberMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    number: string | null
    label: $Enums.PhoneType | null
    locationId: string | null
  }

  export type PhoneNumberCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    number: number
    label: number
    locationId: number
    _all: number
  }


  export type PhoneNumberMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    number?: true
    label?: true
    locationId?: true
  }

  export type PhoneNumberMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    number?: true
    label?: true
    locationId?: true
  }

  export type PhoneNumberCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    number?: true
    label?: true
    locationId?: true
    _all?: true
  }

  export type PhoneNumberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PhoneNumber to aggregate.
     */
    where?: PhoneNumberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhoneNumbers to fetch.
     */
    orderBy?: PhoneNumberOrderByWithRelationInput | PhoneNumberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PhoneNumberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhoneNumbers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhoneNumbers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PhoneNumbers
    **/
    _count?: true | PhoneNumberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PhoneNumberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PhoneNumberMaxAggregateInputType
  }

  export type GetPhoneNumberAggregateType<T extends PhoneNumberAggregateArgs> = {
        [P in keyof T & keyof AggregatePhoneNumber]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePhoneNumber[P]>
      : GetScalarType<T[P], AggregatePhoneNumber[P]>
  }




  export type PhoneNumberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PhoneNumberWhereInput
    orderBy?: PhoneNumberOrderByWithAggregationInput | PhoneNumberOrderByWithAggregationInput[]
    by: PhoneNumberScalarFieldEnum[] | PhoneNumberScalarFieldEnum
    having?: PhoneNumberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PhoneNumberCountAggregateInputType | true
    _min?: PhoneNumberMinAggregateInputType
    _max?: PhoneNumberMaxAggregateInputType
  }

  export type PhoneNumberGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    number: string
    label: $Enums.PhoneType | null
    locationId: string | null
    _count: PhoneNumberCountAggregateOutputType | null
    _min: PhoneNumberMinAggregateOutputType | null
    _max: PhoneNumberMaxAggregateOutputType | null
  }

  type GetPhoneNumberGroupByPayload<T extends PhoneNumberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PhoneNumberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PhoneNumberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PhoneNumberGroupByOutputType[P]>
            : GetScalarType<T[P], PhoneNumberGroupByOutputType[P]>
        }
      >
    >


  export type PhoneNumberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    number?: boolean
    label?: boolean
    locationId?: boolean
    location?: boolean | PhoneNumber$locationArgs<ExtArgs>
  }, ExtArgs["result"]["phoneNumber"]>

  export type PhoneNumberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    number?: boolean
    label?: boolean
    locationId?: boolean
    location?: boolean | PhoneNumber$locationArgs<ExtArgs>
  }, ExtArgs["result"]["phoneNumber"]>

  export type PhoneNumberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    number?: boolean
    label?: boolean
    locationId?: boolean
    location?: boolean | PhoneNumber$locationArgs<ExtArgs>
  }, ExtArgs["result"]["phoneNumber"]>

  export type PhoneNumberSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    number?: boolean
    label?: boolean
    locationId?: boolean
  }

  export type PhoneNumberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "number" | "label" | "locationId", ExtArgs["result"]["phoneNumber"]>
  export type PhoneNumberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | PhoneNumber$locationArgs<ExtArgs>
  }
  export type PhoneNumberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | PhoneNumber$locationArgs<ExtArgs>
  }
  export type PhoneNumberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | PhoneNumber$locationArgs<ExtArgs>
  }

  export type $PhoneNumberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PhoneNumber"
    objects: {
      location: Prisma.$LocationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      number: string
      label: $Enums.PhoneType | null
      locationId: string | null
    }, ExtArgs["result"]["phoneNumber"]>
    composites: {}
  }

  type PhoneNumberGetPayload<S extends boolean | null | undefined | PhoneNumberDefaultArgs> = $Result.GetResult<Prisma.$PhoneNumberPayload, S>

  type PhoneNumberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PhoneNumberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PhoneNumberCountAggregateInputType | true
    }

  export interface PhoneNumberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PhoneNumber'], meta: { name: 'PhoneNumber' } }
    /**
     * Find zero or one PhoneNumber that matches the filter.
     * @param {PhoneNumberFindUniqueArgs} args - Arguments to find a PhoneNumber
     * @example
     * // Get one PhoneNumber
     * const phoneNumber = await prisma.phoneNumber.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PhoneNumberFindUniqueArgs>(args: SelectSubset<T, PhoneNumberFindUniqueArgs<ExtArgs>>): Prisma__PhoneNumberClient<$Result.GetResult<Prisma.$PhoneNumberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PhoneNumber that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PhoneNumberFindUniqueOrThrowArgs} args - Arguments to find a PhoneNumber
     * @example
     * // Get one PhoneNumber
     * const phoneNumber = await prisma.phoneNumber.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PhoneNumberFindUniqueOrThrowArgs>(args: SelectSubset<T, PhoneNumberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PhoneNumberClient<$Result.GetResult<Prisma.$PhoneNumberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PhoneNumber that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhoneNumberFindFirstArgs} args - Arguments to find a PhoneNumber
     * @example
     * // Get one PhoneNumber
     * const phoneNumber = await prisma.phoneNumber.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PhoneNumberFindFirstArgs>(args?: SelectSubset<T, PhoneNumberFindFirstArgs<ExtArgs>>): Prisma__PhoneNumberClient<$Result.GetResult<Prisma.$PhoneNumberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PhoneNumber that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhoneNumberFindFirstOrThrowArgs} args - Arguments to find a PhoneNumber
     * @example
     * // Get one PhoneNumber
     * const phoneNumber = await prisma.phoneNumber.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PhoneNumberFindFirstOrThrowArgs>(args?: SelectSubset<T, PhoneNumberFindFirstOrThrowArgs<ExtArgs>>): Prisma__PhoneNumberClient<$Result.GetResult<Prisma.$PhoneNumberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PhoneNumbers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhoneNumberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PhoneNumbers
     * const phoneNumbers = await prisma.phoneNumber.findMany()
     * 
     * // Get first 10 PhoneNumbers
     * const phoneNumbers = await prisma.phoneNumber.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const phoneNumberWithIdOnly = await prisma.phoneNumber.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PhoneNumberFindManyArgs>(args?: SelectSubset<T, PhoneNumberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhoneNumberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PhoneNumber.
     * @param {PhoneNumberCreateArgs} args - Arguments to create a PhoneNumber.
     * @example
     * // Create one PhoneNumber
     * const PhoneNumber = await prisma.phoneNumber.create({
     *   data: {
     *     // ... data to create a PhoneNumber
     *   }
     * })
     * 
     */
    create<T extends PhoneNumberCreateArgs>(args: SelectSubset<T, PhoneNumberCreateArgs<ExtArgs>>): Prisma__PhoneNumberClient<$Result.GetResult<Prisma.$PhoneNumberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PhoneNumbers.
     * @param {PhoneNumberCreateManyArgs} args - Arguments to create many PhoneNumbers.
     * @example
     * // Create many PhoneNumbers
     * const phoneNumber = await prisma.phoneNumber.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PhoneNumberCreateManyArgs>(args?: SelectSubset<T, PhoneNumberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PhoneNumbers and returns the data saved in the database.
     * @param {PhoneNumberCreateManyAndReturnArgs} args - Arguments to create many PhoneNumbers.
     * @example
     * // Create many PhoneNumbers
     * const phoneNumber = await prisma.phoneNumber.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PhoneNumbers and only return the `id`
     * const phoneNumberWithIdOnly = await prisma.phoneNumber.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PhoneNumberCreateManyAndReturnArgs>(args?: SelectSubset<T, PhoneNumberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhoneNumberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PhoneNumber.
     * @param {PhoneNumberDeleteArgs} args - Arguments to delete one PhoneNumber.
     * @example
     * // Delete one PhoneNumber
     * const PhoneNumber = await prisma.phoneNumber.delete({
     *   where: {
     *     // ... filter to delete one PhoneNumber
     *   }
     * })
     * 
     */
    delete<T extends PhoneNumberDeleteArgs>(args: SelectSubset<T, PhoneNumberDeleteArgs<ExtArgs>>): Prisma__PhoneNumberClient<$Result.GetResult<Prisma.$PhoneNumberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PhoneNumber.
     * @param {PhoneNumberUpdateArgs} args - Arguments to update one PhoneNumber.
     * @example
     * // Update one PhoneNumber
     * const phoneNumber = await prisma.phoneNumber.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PhoneNumberUpdateArgs>(args: SelectSubset<T, PhoneNumberUpdateArgs<ExtArgs>>): Prisma__PhoneNumberClient<$Result.GetResult<Prisma.$PhoneNumberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PhoneNumbers.
     * @param {PhoneNumberDeleteManyArgs} args - Arguments to filter PhoneNumbers to delete.
     * @example
     * // Delete a few PhoneNumbers
     * const { count } = await prisma.phoneNumber.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PhoneNumberDeleteManyArgs>(args?: SelectSubset<T, PhoneNumberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PhoneNumbers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhoneNumberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PhoneNumbers
     * const phoneNumber = await prisma.phoneNumber.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PhoneNumberUpdateManyArgs>(args: SelectSubset<T, PhoneNumberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PhoneNumbers and returns the data updated in the database.
     * @param {PhoneNumberUpdateManyAndReturnArgs} args - Arguments to update many PhoneNumbers.
     * @example
     * // Update many PhoneNumbers
     * const phoneNumber = await prisma.phoneNumber.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PhoneNumbers and only return the `id`
     * const phoneNumberWithIdOnly = await prisma.phoneNumber.updateManyAndReturn({
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
    updateManyAndReturn<T extends PhoneNumberUpdateManyAndReturnArgs>(args: SelectSubset<T, PhoneNumberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhoneNumberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PhoneNumber.
     * @param {PhoneNumberUpsertArgs} args - Arguments to update or create a PhoneNumber.
     * @example
     * // Update or create a PhoneNumber
     * const phoneNumber = await prisma.phoneNumber.upsert({
     *   create: {
     *     // ... data to create a PhoneNumber
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PhoneNumber we want to update
     *   }
     * })
     */
    upsert<T extends PhoneNumberUpsertArgs>(args: SelectSubset<T, PhoneNumberUpsertArgs<ExtArgs>>): Prisma__PhoneNumberClient<$Result.GetResult<Prisma.$PhoneNumberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PhoneNumbers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhoneNumberCountArgs} args - Arguments to filter PhoneNumbers to count.
     * @example
     * // Count the number of PhoneNumbers
     * const count = await prisma.phoneNumber.count({
     *   where: {
     *     // ... the filter for the PhoneNumbers we want to count
     *   }
     * })
    **/
    count<T extends PhoneNumberCountArgs>(
      args?: Subset<T, PhoneNumberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PhoneNumberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PhoneNumber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhoneNumberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PhoneNumberAggregateArgs>(args: Subset<T, PhoneNumberAggregateArgs>): Prisma.PrismaPromise<GetPhoneNumberAggregateType<T>>

    /**
     * Group by PhoneNumber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhoneNumberGroupByArgs} args - Group by arguments.
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
      T extends PhoneNumberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PhoneNumberGroupByArgs['orderBy'] }
        : { orderBy?: PhoneNumberGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PhoneNumberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPhoneNumberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PhoneNumber model
   */
  readonly fields: PhoneNumberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PhoneNumber.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PhoneNumberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    location<T extends PhoneNumber$locationArgs<ExtArgs> = {}>(args?: Subset<T, PhoneNumber$locationArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PhoneNumber model
   */
  interface PhoneNumberFieldRefs {
    readonly id: FieldRef<"PhoneNumber", 'String'>
    readonly createdAt: FieldRef<"PhoneNumber", 'DateTime'>
    readonly updatedAt: FieldRef<"PhoneNumber", 'DateTime'>
    readonly number: FieldRef<"PhoneNumber", 'String'>
    readonly label: FieldRef<"PhoneNumber", 'PhoneType'>
    readonly locationId: FieldRef<"PhoneNumber", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PhoneNumber findUnique
   */
  export type PhoneNumberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhoneNumber
     */
    select?: PhoneNumberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhoneNumber
     */
    omit?: PhoneNumberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneNumberInclude<ExtArgs> | null
    /**
     * Filter, which PhoneNumber to fetch.
     */
    where: PhoneNumberWhereUniqueInput
  }

  /**
   * PhoneNumber findUniqueOrThrow
   */
  export type PhoneNumberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhoneNumber
     */
    select?: PhoneNumberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhoneNumber
     */
    omit?: PhoneNumberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneNumberInclude<ExtArgs> | null
    /**
     * Filter, which PhoneNumber to fetch.
     */
    where: PhoneNumberWhereUniqueInput
  }

  /**
   * PhoneNumber findFirst
   */
  export type PhoneNumberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhoneNumber
     */
    select?: PhoneNumberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhoneNumber
     */
    omit?: PhoneNumberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneNumberInclude<ExtArgs> | null
    /**
     * Filter, which PhoneNumber to fetch.
     */
    where?: PhoneNumberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhoneNumbers to fetch.
     */
    orderBy?: PhoneNumberOrderByWithRelationInput | PhoneNumberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PhoneNumbers.
     */
    cursor?: PhoneNumberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhoneNumbers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhoneNumbers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PhoneNumbers.
     */
    distinct?: PhoneNumberScalarFieldEnum | PhoneNumberScalarFieldEnum[]
  }

  /**
   * PhoneNumber findFirstOrThrow
   */
  export type PhoneNumberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhoneNumber
     */
    select?: PhoneNumberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhoneNumber
     */
    omit?: PhoneNumberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneNumberInclude<ExtArgs> | null
    /**
     * Filter, which PhoneNumber to fetch.
     */
    where?: PhoneNumberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhoneNumbers to fetch.
     */
    orderBy?: PhoneNumberOrderByWithRelationInput | PhoneNumberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PhoneNumbers.
     */
    cursor?: PhoneNumberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhoneNumbers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhoneNumbers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PhoneNumbers.
     */
    distinct?: PhoneNumberScalarFieldEnum | PhoneNumberScalarFieldEnum[]
  }

  /**
   * PhoneNumber findMany
   */
  export type PhoneNumberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhoneNumber
     */
    select?: PhoneNumberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhoneNumber
     */
    omit?: PhoneNumberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneNumberInclude<ExtArgs> | null
    /**
     * Filter, which PhoneNumbers to fetch.
     */
    where?: PhoneNumberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhoneNumbers to fetch.
     */
    orderBy?: PhoneNumberOrderByWithRelationInput | PhoneNumberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PhoneNumbers.
     */
    cursor?: PhoneNumberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhoneNumbers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhoneNumbers.
     */
    skip?: number
    distinct?: PhoneNumberScalarFieldEnum | PhoneNumberScalarFieldEnum[]
  }

  /**
   * PhoneNumber create
   */
  export type PhoneNumberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhoneNumber
     */
    select?: PhoneNumberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhoneNumber
     */
    omit?: PhoneNumberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneNumberInclude<ExtArgs> | null
    /**
     * The data needed to create a PhoneNumber.
     */
    data: XOR<PhoneNumberCreateInput, PhoneNumberUncheckedCreateInput>
  }

  /**
   * PhoneNumber createMany
   */
  export type PhoneNumberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PhoneNumbers.
     */
    data: PhoneNumberCreateManyInput | PhoneNumberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PhoneNumber createManyAndReturn
   */
  export type PhoneNumberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhoneNumber
     */
    select?: PhoneNumberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PhoneNumber
     */
    omit?: PhoneNumberOmit<ExtArgs> | null
    /**
     * The data used to create many PhoneNumbers.
     */
    data: PhoneNumberCreateManyInput | PhoneNumberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneNumberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PhoneNumber update
   */
  export type PhoneNumberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhoneNumber
     */
    select?: PhoneNumberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhoneNumber
     */
    omit?: PhoneNumberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneNumberInclude<ExtArgs> | null
    /**
     * The data needed to update a PhoneNumber.
     */
    data: XOR<PhoneNumberUpdateInput, PhoneNumberUncheckedUpdateInput>
    /**
     * Choose, which PhoneNumber to update.
     */
    where: PhoneNumberWhereUniqueInput
  }

  /**
   * PhoneNumber updateMany
   */
  export type PhoneNumberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PhoneNumbers.
     */
    data: XOR<PhoneNumberUpdateManyMutationInput, PhoneNumberUncheckedUpdateManyInput>
    /**
     * Filter which PhoneNumbers to update
     */
    where?: PhoneNumberWhereInput
    /**
     * Limit how many PhoneNumbers to update.
     */
    limit?: number
  }

  /**
   * PhoneNumber updateManyAndReturn
   */
  export type PhoneNumberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhoneNumber
     */
    select?: PhoneNumberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PhoneNumber
     */
    omit?: PhoneNumberOmit<ExtArgs> | null
    /**
     * The data used to update PhoneNumbers.
     */
    data: XOR<PhoneNumberUpdateManyMutationInput, PhoneNumberUncheckedUpdateManyInput>
    /**
     * Filter which PhoneNumbers to update
     */
    where?: PhoneNumberWhereInput
    /**
     * Limit how many PhoneNumbers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneNumberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PhoneNumber upsert
   */
  export type PhoneNumberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhoneNumber
     */
    select?: PhoneNumberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhoneNumber
     */
    omit?: PhoneNumberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneNumberInclude<ExtArgs> | null
    /**
     * The filter to search for the PhoneNumber to update in case it exists.
     */
    where: PhoneNumberWhereUniqueInput
    /**
     * In case the PhoneNumber found by the `where` argument doesn't exist, create a new PhoneNumber with this data.
     */
    create: XOR<PhoneNumberCreateInput, PhoneNumberUncheckedCreateInput>
    /**
     * In case the PhoneNumber was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PhoneNumberUpdateInput, PhoneNumberUncheckedUpdateInput>
  }

  /**
   * PhoneNumber delete
   */
  export type PhoneNumberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhoneNumber
     */
    select?: PhoneNumberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhoneNumber
     */
    omit?: PhoneNumberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneNumberInclude<ExtArgs> | null
    /**
     * Filter which PhoneNumber to delete.
     */
    where: PhoneNumberWhereUniqueInput
  }

  /**
   * PhoneNumber deleteMany
   */
  export type PhoneNumberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PhoneNumbers to delete
     */
    where?: PhoneNumberWhereInput
    /**
     * Limit how many PhoneNumbers to delete.
     */
    limit?: number
  }

  /**
   * PhoneNumber.location
   */
  export type PhoneNumber$locationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    where?: LocationWhereInput
  }

  /**
   * PhoneNumber without action
   */
  export type PhoneNumberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhoneNumber
     */
    select?: PhoneNumberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhoneNumber
     */
    omit?: PhoneNumberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhoneNumberInclude<ExtArgs> | null
  }


  /**
   * Model Note
   */

  export type AggregateNote = {
    _count: NoteCountAggregateOutputType | null
    _min: NoteMinAggregateOutputType | null
    _max: NoteMaxAggregateOutputType | null
  }

  export type NoteMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    text: string | null
    leadId: string | null
    userId: string | null
  }

  export type NoteMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    text: string | null
    leadId: string | null
    userId: string | null
  }

  export type NoteCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    text: number
    leadId: number
    userId: number
    _all: number
  }


  export type NoteMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    text?: true
    leadId?: true
    userId?: true
  }

  export type NoteMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    text?: true
    leadId?: true
    userId?: true
  }

  export type NoteCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    text?: true
    leadId?: true
    userId?: true
    _all?: true
  }

  export type NoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Note to aggregate.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notes
    **/
    _count?: true | NoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NoteMaxAggregateInputType
  }

  export type GetNoteAggregateType<T extends NoteAggregateArgs> = {
        [P in keyof T & keyof AggregateNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNote[P]>
      : GetScalarType<T[P], AggregateNote[P]>
  }




  export type NoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoteWhereInput
    orderBy?: NoteOrderByWithAggregationInput | NoteOrderByWithAggregationInput[]
    by: NoteScalarFieldEnum[] | NoteScalarFieldEnum
    having?: NoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NoteCountAggregateInputType | true
    _min?: NoteMinAggregateInputType
    _max?: NoteMaxAggregateInputType
  }

  export type NoteGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    text: string
    leadId: string
    userId: string
    _count: NoteCountAggregateOutputType | null
    _min: NoteMinAggregateOutputType | null
    _max: NoteMaxAggregateOutputType | null
  }

  type GetNoteGroupByPayload<T extends NoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NoteGroupByOutputType[P]>
            : GetScalarType<T[P], NoteGroupByOutputType[P]>
        }
      >
    >


  export type NoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    text?: boolean
    leadId?: boolean
    userId?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["note"]>

  export type NoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    text?: boolean
    leadId?: boolean
    userId?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["note"]>

  export type NoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    text?: boolean
    leadId?: boolean
    userId?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["note"]>

  export type NoteSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    text?: boolean
    leadId?: boolean
    userId?: boolean
  }

  export type NoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "text" | "leadId" | "userId", ExtArgs["result"]["note"]>
  export type NoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Note"
    objects: {
      lead: Prisma.$LeadPayload<ExtArgs>
      author: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      text: string
      leadId: string
      userId: string
    }, ExtArgs["result"]["note"]>
    composites: {}
  }

  type NoteGetPayload<S extends boolean | null | undefined | NoteDefaultArgs> = $Result.GetResult<Prisma.$NotePayload, S>

  type NoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NoteCountAggregateInputType | true
    }

  export interface NoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Note'], meta: { name: 'Note' } }
    /**
     * Find zero or one Note that matches the filter.
     * @param {NoteFindUniqueArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NoteFindUniqueArgs>(args: SelectSubset<T, NoteFindUniqueArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Note that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NoteFindUniqueOrThrowArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NoteFindUniqueOrThrowArgs>(args: SelectSubset<T, NoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Note that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindFirstArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NoteFindFirstArgs>(args?: SelectSubset<T, NoteFindFirstArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Note that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindFirstOrThrowArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NoteFindFirstOrThrowArgs>(args?: SelectSubset<T, NoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notes
     * const notes = await prisma.note.findMany()
     * 
     * // Get first 10 Notes
     * const notes = await prisma.note.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const noteWithIdOnly = await prisma.note.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NoteFindManyArgs>(args?: SelectSubset<T, NoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Note.
     * @param {NoteCreateArgs} args - Arguments to create a Note.
     * @example
     * // Create one Note
     * const Note = await prisma.note.create({
     *   data: {
     *     // ... data to create a Note
     *   }
     * })
     * 
     */
    create<T extends NoteCreateArgs>(args: SelectSubset<T, NoteCreateArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notes.
     * @param {NoteCreateManyArgs} args - Arguments to create many Notes.
     * @example
     * // Create many Notes
     * const note = await prisma.note.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NoteCreateManyArgs>(args?: SelectSubset<T, NoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notes and returns the data saved in the database.
     * @param {NoteCreateManyAndReturnArgs} args - Arguments to create many Notes.
     * @example
     * // Create many Notes
     * const note = await prisma.note.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notes and only return the `id`
     * const noteWithIdOnly = await prisma.note.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NoteCreateManyAndReturnArgs>(args?: SelectSubset<T, NoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Note.
     * @param {NoteDeleteArgs} args - Arguments to delete one Note.
     * @example
     * // Delete one Note
     * const Note = await prisma.note.delete({
     *   where: {
     *     // ... filter to delete one Note
     *   }
     * })
     * 
     */
    delete<T extends NoteDeleteArgs>(args: SelectSubset<T, NoteDeleteArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Note.
     * @param {NoteUpdateArgs} args - Arguments to update one Note.
     * @example
     * // Update one Note
     * const note = await prisma.note.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NoteUpdateArgs>(args: SelectSubset<T, NoteUpdateArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notes.
     * @param {NoteDeleteManyArgs} args - Arguments to filter Notes to delete.
     * @example
     * // Delete a few Notes
     * const { count } = await prisma.note.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NoteDeleteManyArgs>(args?: SelectSubset<T, NoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notes
     * const note = await prisma.note.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NoteUpdateManyArgs>(args: SelectSubset<T, NoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notes and returns the data updated in the database.
     * @param {NoteUpdateManyAndReturnArgs} args - Arguments to update many Notes.
     * @example
     * // Update many Notes
     * const note = await prisma.note.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notes and only return the `id`
     * const noteWithIdOnly = await prisma.note.updateManyAndReturn({
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
    updateManyAndReturn<T extends NoteUpdateManyAndReturnArgs>(args: SelectSubset<T, NoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Note.
     * @param {NoteUpsertArgs} args - Arguments to update or create a Note.
     * @example
     * // Update or create a Note
     * const note = await prisma.note.upsert({
     *   create: {
     *     // ... data to create a Note
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Note we want to update
     *   }
     * })
     */
    upsert<T extends NoteUpsertArgs>(args: SelectSubset<T, NoteUpsertArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteCountArgs} args - Arguments to filter Notes to count.
     * @example
     * // Count the number of Notes
     * const count = await prisma.note.count({
     *   where: {
     *     // ... the filter for the Notes we want to count
     *   }
     * })
    **/
    count<T extends NoteCountArgs>(
      args?: Subset<T, NoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Note.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NoteAggregateArgs>(args: Subset<T, NoteAggregateArgs>): Prisma.PrismaPromise<GetNoteAggregateType<T>>

    /**
     * Group by Note.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteGroupByArgs} args - Group by arguments.
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
      T extends NoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NoteGroupByArgs['orderBy'] }
        : { orderBy?: NoteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Note model
   */
  readonly fields: NoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Note.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends LeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeadDefaultArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Note model
   */
  interface NoteFieldRefs {
    readonly id: FieldRef<"Note", 'String'>
    readonly createdAt: FieldRef<"Note", 'DateTime'>
    readonly updatedAt: FieldRef<"Note", 'DateTime'>
    readonly text: FieldRef<"Note", 'String'>
    readonly leadId: FieldRef<"Note", 'String'>
    readonly userId: FieldRef<"Note", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Note findUnique
   */
  export type NoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note findUniqueOrThrow
   */
  export type NoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note findFirst
   */
  export type NoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notes.
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notes.
     */
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Note findFirstOrThrow
   */
  export type NoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notes.
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notes.
     */
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Note findMany
   */
  export type NoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Notes to fetch.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notes.
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Note create
   */
  export type NoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * The data needed to create a Note.
     */
    data: XOR<NoteCreateInput, NoteUncheckedCreateInput>
  }

  /**
   * Note createMany
   */
  export type NoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notes.
     */
    data: NoteCreateManyInput | NoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Note createManyAndReturn
   */
  export type NoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * The data used to create many Notes.
     */
    data: NoteCreateManyInput | NoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Note update
   */
  export type NoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * The data needed to update a Note.
     */
    data: XOR<NoteUpdateInput, NoteUncheckedUpdateInput>
    /**
     * Choose, which Note to update.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note updateMany
   */
  export type NoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notes.
     */
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyInput>
    /**
     * Filter which Notes to update
     */
    where?: NoteWhereInput
    /**
     * Limit how many Notes to update.
     */
    limit?: number
  }

  /**
   * Note updateManyAndReturn
   */
  export type NoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * The data used to update Notes.
     */
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyInput>
    /**
     * Filter which Notes to update
     */
    where?: NoteWhereInput
    /**
     * Limit how many Notes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Note upsert
   */
  export type NoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * The filter to search for the Note to update in case it exists.
     */
    where: NoteWhereUniqueInput
    /**
     * In case the Note found by the `where` argument doesn't exist, create a new Note with this data.
     */
    create: XOR<NoteCreateInput, NoteUncheckedCreateInput>
    /**
     * In case the Note was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NoteUpdateInput, NoteUncheckedUpdateInput>
  }

  /**
   * Note delete
   */
  export type NoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter which Note to delete.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note deleteMany
   */
  export type NoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notes to delete
     */
    where?: NoteWhereInput
    /**
     * Limit how many Notes to delete.
     */
    limit?: number
  }

  /**
   * Note without action
   */
  export type NoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
  }


  /**
   * Model TouchPoint
   */

  export type AggregateTouchPoint = {
    _count: TouchPointCountAggregateOutputType | null
    _min: TouchPointMinAggregateOutputType | null
    _max: TouchPointMaxAggregateOutputType | null
  }

  export type TouchPointMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    date: Date | null
    type: $Enums.TouchPointType | null
    leadId: string | null
    contactedById: string | null
    receivedResponse: boolean | null
    summary: string | null
    sequencePosition: $Enums.SequencePosition | null
  }

  export type TouchPointMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    date: Date | null
    type: $Enums.TouchPointType | null
    leadId: string | null
    contactedById: string | null
    receivedResponse: boolean | null
    summary: string | null
    sequencePosition: $Enums.SequencePosition | null
  }

  export type TouchPointCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    date: number
    type: number
    leadId: number
    contactedById: number
    receivedResponse: number
    summary: number
    sequencePosition: number
    _all: number
  }


  export type TouchPointMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    date?: true
    type?: true
    leadId?: true
    contactedById?: true
    receivedResponse?: true
    summary?: true
    sequencePosition?: true
  }

  export type TouchPointMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    date?: true
    type?: true
    leadId?: true
    contactedById?: true
    receivedResponse?: true
    summary?: true
    sequencePosition?: true
  }

  export type TouchPointCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    date?: true
    type?: true
    leadId?: true
    contactedById?: true
    receivedResponse?: true
    summary?: true
    sequencePosition?: true
    _all?: true
  }

  export type TouchPointAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TouchPoint to aggregate.
     */
    where?: TouchPointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TouchPoints to fetch.
     */
    orderBy?: TouchPointOrderByWithRelationInput | TouchPointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TouchPointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TouchPoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TouchPoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TouchPoints
    **/
    _count?: true | TouchPointCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TouchPointMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TouchPointMaxAggregateInputType
  }

  export type GetTouchPointAggregateType<T extends TouchPointAggregateArgs> = {
        [P in keyof T & keyof AggregateTouchPoint]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTouchPoint[P]>
      : GetScalarType<T[P], AggregateTouchPoint[P]>
  }




  export type TouchPointGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TouchPointWhereInput
    orderBy?: TouchPointOrderByWithAggregationInput | TouchPointOrderByWithAggregationInput[]
    by: TouchPointScalarFieldEnum[] | TouchPointScalarFieldEnum
    having?: TouchPointScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TouchPointCountAggregateInputType | true
    _min?: TouchPointMinAggregateInputType
    _max?: TouchPointMaxAggregateInputType
  }

  export type TouchPointGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    date: Date
    type: $Enums.TouchPointType
    leadId: string
    contactedById: string
    receivedResponse: boolean
    summary: string | null
    sequencePosition: $Enums.SequencePosition | null
    _count: TouchPointCountAggregateOutputType | null
    _min: TouchPointMinAggregateOutputType | null
    _max: TouchPointMaxAggregateOutputType | null
  }

  type GetTouchPointGroupByPayload<T extends TouchPointGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TouchPointGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TouchPointGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TouchPointGroupByOutputType[P]>
            : GetScalarType<T[P], TouchPointGroupByOutputType[P]>
        }
      >
    >


  export type TouchPointSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    date?: boolean
    type?: boolean
    leadId?: boolean
    contactedById?: boolean
    receivedResponse?: boolean
    summary?: boolean
    sequencePosition?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    contactedBy?: boolean | UserDefaultArgs<ExtArgs>
    reminders?: boolean | TouchPoint$remindersArgs<ExtArgs>
    _count?: boolean | TouchPointCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["touchPoint"]>

  export type TouchPointSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    date?: boolean
    type?: boolean
    leadId?: boolean
    contactedById?: boolean
    receivedResponse?: boolean
    summary?: boolean
    sequencePosition?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    contactedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["touchPoint"]>

  export type TouchPointSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    date?: boolean
    type?: boolean
    leadId?: boolean
    contactedById?: boolean
    receivedResponse?: boolean
    summary?: boolean
    sequencePosition?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    contactedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["touchPoint"]>

  export type TouchPointSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    date?: boolean
    type?: boolean
    leadId?: boolean
    contactedById?: boolean
    receivedResponse?: boolean
    summary?: boolean
    sequencePosition?: boolean
  }

  export type TouchPointOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "date" | "type" | "leadId" | "contactedById" | "receivedResponse" | "summary" | "sequencePosition", ExtArgs["result"]["touchPoint"]>
  export type TouchPointInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    contactedBy?: boolean | UserDefaultArgs<ExtArgs>
    reminders?: boolean | TouchPoint$remindersArgs<ExtArgs>
    _count?: boolean | TouchPointCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TouchPointIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    contactedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TouchPointIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    contactedBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TouchPointPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TouchPoint"
    objects: {
      lead: Prisma.$LeadPayload<ExtArgs>
      contactedBy: Prisma.$UserPayload<ExtArgs>
      reminders: Prisma.$ReminderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      date: Date
      type: $Enums.TouchPointType
      leadId: string
      contactedById: string
      receivedResponse: boolean
      summary: string | null
      sequencePosition: $Enums.SequencePosition | null
    }, ExtArgs["result"]["touchPoint"]>
    composites: {}
  }

  type TouchPointGetPayload<S extends boolean | null | undefined | TouchPointDefaultArgs> = $Result.GetResult<Prisma.$TouchPointPayload, S>

  type TouchPointCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TouchPointFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TouchPointCountAggregateInputType | true
    }

  export interface TouchPointDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TouchPoint'], meta: { name: 'TouchPoint' } }
    /**
     * Find zero or one TouchPoint that matches the filter.
     * @param {TouchPointFindUniqueArgs} args - Arguments to find a TouchPoint
     * @example
     * // Get one TouchPoint
     * const touchPoint = await prisma.touchPoint.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TouchPointFindUniqueArgs>(args: SelectSubset<T, TouchPointFindUniqueArgs<ExtArgs>>): Prisma__TouchPointClient<$Result.GetResult<Prisma.$TouchPointPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TouchPoint that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TouchPointFindUniqueOrThrowArgs} args - Arguments to find a TouchPoint
     * @example
     * // Get one TouchPoint
     * const touchPoint = await prisma.touchPoint.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TouchPointFindUniqueOrThrowArgs>(args: SelectSubset<T, TouchPointFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TouchPointClient<$Result.GetResult<Prisma.$TouchPointPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TouchPoint that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TouchPointFindFirstArgs} args - Arguments to find a TouchPoint
     * @example
     * // Get one TouchPoint
     * const touchPoint = await prisma.touchPoint.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TouchPointFindFirstArgs>(args?: SelectSubset<T, TouchPointFindFirstArgs<ExtArgs>>): Prisma__TouchPointClient<$Result.GetResult<Prisma.$TouchPointPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TouchPoint that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TouchPointFindFirstOrThrowArgs} args - Arguments to find a TouchPoint
     * @example
     * // Get one TouchPoint
     * const touchPoint = await prisma.touchPoint.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TouchPointFindFirstOrThrowArgs>(args?: SelectSubset<T, TouchPointFindFirstOrThrowArgs<ExtArgs>>): Prisma__TouchPointClient<$Result.GetResult<Prisma.$TouchPointPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TouchPoints that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TouchPointFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TouchPoints
     * const touchPoints = await prisma.touchPoint.findMany()
     * 
     * // Get first 10 TouchPoints
     * const touchPoints = await prisma.touchPoint.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const touchPointWithIdOnly = await prisma.touchPoint.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TouchPointFindManyArgs>(args?: SelectSubset<T, TouchPointFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TouchPointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TouchPoint.
     * @param {TouchPointCreateArgs} args - Arguments to create a TouchPoint.
     * @example
     * // Create one TouchPoint
     * const TouchPoint = await prisma.touchPoint.create({
     *   data: {
     *     // ... data to create a TouchPoint
     *   }
     * })
     * 
     */
    create<T extends TouchPointCreateArgs>(args: SelectSubset<T, TouchPointCreateArgs<ExtArgs>>): Prisma__TouchPointClient<$Result.GetResult<Prisma.$TouchPointPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TouchPoints.
     * @param {TouchPointCreateManyArgs} args - Arguments to create many TouchPoints.
     * @example
     * // Create many TouchPoints
     * const touchPoint = await prisma.touchPoint.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TouchPointCreateManyArgs>(args?: SelectSubset<T, TouchPointCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TouchPoints and returns the data saved in the database.
     * @param {TouchPointCreateManyAndReturnArgs} args - Arguments to create many TouchPoints.
     * @example
     * // Create many TouchPoints
     * const touchPoint = await prisma.touchPoint.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TouchPoints and only return the `id`
     * const touchPointWithIdOnly = await prisma.touchPoint.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TouchPointCreateManyAndReturnArgs>(args?: SelectSubset<T, TouchPointCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TouchPointPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TouchPoint.
     * @param {TouchPointDeleteArgs} args - Arguments to delete one TouchPoint.
     * @example
     * // Delete one TouchPoint
     * const TouchPoint = await prisma.touchPoint.delete({
     *   where: {
     *     // ... filter to delete one TouchPoint
     *   }
     * })
     * 
     */
    delete<T extends TouchPointDeleteArgs>(args: SelectSubset<T, TouchPointDeleteArgs<ExtArgs>>): Prisma__TouchPointClient<$Result.GetResult<Prisma.$TouchPointPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TouchPoint.
     * @param {TouchPointUpdateArgs} args - Arguments to update one TouchPoint.
     * @example
     * // Update one TouchPoint
     * const touchPoint = await prisma.touchPoint.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TouchPointUpdateArgs>(args: SelectSubset<T, TouchPointUpdateArgs<ExtArgs>>): Prisma__TouchPointClient<$Result.GetResult<Prisma.$TouchPointPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TouchPoints.
     * @param {TouchPointDeleteManyArgs} args - Arguments to filter TouchPoints to delete.
     * @example
     * // Delete a few TouchPoints
     * const { count } = await prisma.touchPoint.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TouchPointDeleteManyArgs>(args?: SelectSubset<T, TouchPointDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TouchPoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TouchPointUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TouchPoints
     * const touchPoint = await prisma.touchPoint.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TouchPointUpdateManyArgs>(args: SelectSubset<T, TouchPointUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TouchPoints and returns the data updated in the database.
     * @param {TouchPointUpdateManyAndReturnArgs} args - Arguments to update many TouchPoints.
     * @example
     * // Update many TouchPoints
     * const touchPoint = await prisma.touchPoint.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TouchPoints and only return the `id`
     * const touchPointWithIdOnly = await prisma.touchPoint.updateManyAndReturn({
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
    updateManyAndReturn<T extends TouchPointUpdateManyAndReturnArgs>(args: SelectSubset<T, TouchPointUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TouchPointPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TouchPoint.
     * @param {TouchPointUpsertArgs} args - Arguments to update or create a TouchPoint.
     * @example
     * // Update or create a TouchPoint
     * const touchPoint = await prisma.touchPoint.upsert({
     *   create: {
     *     // ... data to create a TouchPoint
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TouchPoint we want to update
     *   }
     * })
     */
    upsert<T extends TouchPointUpsertArgs>(args: SelectSubset<T, TouchPointUpsertArgs<ExtArgs>>): Prisma__TouchPointClient<$Result.GetResult<Prisma.$TouchPointPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TouchPoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TouchPointCountArgs} args - Arguments to filter TouchPoints to count.
     * @example
     * // Count the number of TouchPoints
     * const count = await prisma.touchPoint.count({
     *   where: {
     *     // ... the filter for the TouchPoints we want to count
     *   }
     * })
    **/
    count<T extends TouchPointCountArgs>(
      args?: Subset<T, TouchPointCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TouchPointCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TouchPoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TouchPointAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TouchPointAggregateArgs>(args: Subset<T, TouchPointAggregateArgs>): Prisma.PrismaPromise<GetTouchPointAggregateType<T>>

    /**
     * Group by TouchPoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TouchPointGroupByArgs} args - Group by arguments.
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
      T extends TouchPointGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TouchPointGroupByArgs['orderBy'] }
        : { orderBy?: TouchPointGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TouchPointGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTouchPointGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TouchPoint model
   */
  readonly fields: TouchPointFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TouchPoint.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TouchPointClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends LeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeadDefaultArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    contactedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reminders<T extends TouchPoint$remindersArgs<ExtArgs> = {}>(args?: Subset<T, TouchPoint$remindersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the TouchPoint model
   */
  interface TouchPointFieldRefs {
    readonly id: FieldRef<"TouchPoint", 'String'>
    readonly createdAt: FieldRef<"TouchPoint", 'DateTime'>
    readonly updatedAt: FieldRef<"TouchPoint", 'DateTime'>
    readonly date: FieldRef<"TouchPoint", 'DateTime'>
    readonly type: FieldRef<"TouchPoint", 'TouchPointType'>
    readonly leadId: FieldRef<"TouchPoint", 'String'>
    readonly contactedById: FieldRef<"TouchPoint", 'String'>
    readonly receivedResponse: FieldRef<"TouchPoint", 'Boolean'>
    readonly summary: FieldRef<"TouchPoint", 'String'>
    readonly sequencePosition: FieldRef<"TouchPoint", 'SequencePosition'>
  }
    

  // Custom InputTypes
  /**
   * TouchPoint findUnique
   */
  export type TouchPointFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TouchPoint
     */
    select?: TouchPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TouchPoint
     */
    omit?: TouchPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TouchPointInclude<ExtArgs> | null
    /**
     * Filter, which TouchPoint to fetch.
     */
    where: TouchPointWhereUniqueInput
  }

  /**
   * TouchPoint findUniqueOrThrow
   */
  export type TouchPointFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TouchPoint
     */
    select?: TouchPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TouchPoint
     */
    omit?: TouchPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TouchPointInclude<ExtArgs> | null
    /**
     * Filter, which TouchPoint to fetch.
     */
    where: TouchPointWhereUniqueInput
  }

  /**
   * TouchPoint findFirst
   */
  export type TouchPointFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TouchPoint
     */
    select?: TouchPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TouchPoint
     */
    omit?: TouchPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TouchPointInclude<ExtArgs> | null
    /**
     * Filter, which TouchPoint to fetch.
     */
    where?: TouchPointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TouchPoints to fetch.
     */
    orderBy?: TouchPointOrderByWithRelationInput | TouchPointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TouchPoints.
     */
    cursor?: TouchPointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TouchPoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TouchPoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TouchPoints.
     */
    distinct?: TouchPointScalarFieldEnum | TouchPointScalarFieldEnum[]
  }

  /**
   * TouchPoint findFirstOrThrow
   */
  export type TouchPointFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TouchPoint
     */
    select?: TouchPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TouchPoint
     */
    omit?: TouchPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TouchPointInclude<ExtArgs> | null
    /**
     * Filter, which TouchPoint to fetch.
     */
    where?: TouchPointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TouchPoints to fetch.
     */
    orderBy?: TouchPointOrderByWithRelationInput | TouchPointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TouchPoints.
     */
    cursor?: TouchPointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TouchPoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TouchPoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TouchPoints.
     */
    distinct?: TouchPointScalarFieldEnum | TouchPointScalarFieldEnum[]
  }

  /**
   * TouchPoint findMany
   */
  export type TouchPointFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TouchPoint
     */
    select?: TouchPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TouchPoint
     */
    omit?: TouchPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TouchPointInclude<ExtArgs> | null
    /**
     * Filter, which TouchPoints to fetch.
     */
    where?: TouchPointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TouchPoints to fetch.
     */
    orderBy?: TouchPointOrderByWithRelationInput | TouchPointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TouchPoints.
     */
    cursor?: TouchPointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TouchPoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TouchPoints.
     */
    skip?: number
    distinct?: TouchPointScalarFieldEnum | TouchPointScalarFieldEnum[]
  }

  /**
   * TouchPoint create
   */
  export type TouchPointCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TouchPoint
     */
    select?: TouchPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TouchPoint
     */
    omit?: TouchPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TouchPointInclude<ExtArgs> | null
    /**
     * The data needed to create a TouchPoint.
     */
    data: XOR<TouchPointCreateInput, TouchPointUncheckedCreateInput>
  }

  /**
   * TouchPoint createMany
   */
  export type TouchPointCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TouchPoints.
     */
    data: TouchPointCreateManyInput | TouchPointCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TouchPoint createManyAndReturn
   */
  export type TouchPointCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TouchPoint
     */
    select?: TouchPointSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TouchPoint
     */
    omit?: TouchPointOmit<ExtArgs> | null
    /**
     * The data used to create many TouchPoints.
     */
    data: TouchPointCreateManyInput | TouchPointCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TouchPointIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TouchPoint update
   */
  export type TouchPointUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TouchPoint
     */
    select?: TouchPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TouchPoint
     */
    omit?: TouchPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TouchPointInclude<ExtArgs> | null
    /**
     * The data needed to update a TouchPoint.
     */
    data: XOR<TouchPointUpdateInput, TouchPointUncheckedUpdateInput>
    /**
     * Choose, which TouchPoint to update.
     */
    where: TouchPointWhereUniqueInput
  }

  /**
   * TouchPoint updateMany
   */
  export type TouchPointUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TouchPoints.
     */
    data: XOR<TouchPointUpdateManyMutationInput, TouchPointUncheckedUpdateManyInput>
    /**
     * Filter which TouchPoints to update
     */
    where?: TouchPointWhereInput
    /**
     * Limit how many TouchPoints to update.
     */
    limit?: number
  }

  /**
   * TouchPoint updateManyAndReturn
   */
  export type TouchPointUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TouchPoint
     */
    select?: TouchPointSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TouchPoint
     */
    omit?: TouchPointOmit<ExtArgs> | null
    /**
     * The data used to update TouchPoints.
     */
    data: XOR<TouchPointUpdateManyMutationInput, TouchPointUncheckedUpdateManyInput>
    /**
     * Filter which TouchPoints to update
     */
    where?: TouchPointWhereInput
    /**
     * Limit how many TouchPoints to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TouchPointIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TouchPoint upsert
   */
  export type TouchPointUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TouchPoint
     */
    select?: TouchPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TouchPoint
     */
    omit?: TouchPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TouchPointInclude<ExtArgs> | null
    /**
     * The filter to search for the TouchPoint to update in case it exists.
     */
    where: TouchPointWhereUniqueInput
    /**
     * In case the TouchPoint found by the `where` argument doesn't exist, create a new TouchPoint with this data.
     */
    create: XOR<TouchPointCreateInput, TouchPointUncheckedCreateInput>
    /**
     * In case the TouchPoint was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TouchPointUpdateInput, TouchPointUncheckedUpdateInput>
  }

  /**
   * TouchPoint delete
   */
  export type TouchPointDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TouchPoint
     */
    select?: TouchPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TouchPoint
     */
    omit?: TouchPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TouchPointInclude<ExtArgs> | null
    /**
     * Filter which TouchPoint to delete.
     */
    where: TouchPointWhereUniqueInput
  }

  /**
   * TouchPoint deleteMany
   */
  export type TouchPointDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TouchPoints to delete
     */
    where?: TouchPointWhereInput
    /**
     * Limit how many TouchPoints to delete.
     */
    limit?: number
  }

  /**
   * TouchPoint.reminders
   */
  export type TouchPoint$remindersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    where?: ReminderWhereInput
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    cursor?: ReminderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReminderScalarFieldEnum | ReminderScalarFieldEnum[]
  }

  /**
   * TouchPoint without action
   */
  export type TouchPointDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TouchPoint
     */
    select?: TouchPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TouchPoint
     */
    omit?: TouchPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TouchPointInclude<ExtArgs> | null
  }


  /**
   * Model Reminder
   */

  export type AggregateReminder = {
    _count: ReminderCountAggregateOutputType | null
    _min: ReminderMinAggregateOutputType | null
    _max: ReminderMaxAggregateOutputType | null
  }

  export type ReminderMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    leadId: string | null
    touchPointId: string | null
    type: $Enums.TouchPointType | null
    dueDate: Date | null
    note: string | null
    completed: boolean | null
    completedAt: Date | null
    isCheckIn: boolean | null
    isResponseCheck: boolean | null
    isEmailSentCheck: boolean | null
  }

  export type ReminderMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    leadId: string | null
    touchPointId: string | null
    type: $Enums.TouchPointType | null
    dueDate: Date | null
    note: string | null
    completed: boolean | null
    completedAt: Date | null
    isCheckIn: boolean | null
    isResponseCheck: boolean | null
    isEmailSentCheck: boolean | null
  }

  export type ReminderCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    leadId: number
    touchPointId: number
    type: number
    dueDate: number
    note: number
    completed: number
    completedAt: number
    isCheckIn: number
    isResponseCheck: number
    isEmailSentCheck: number
    _all: number
  }


  export type ReminderMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    leadId?: true
    touchPointId?: true
    type?: true
    dueDate?: true
    note?: true
    completed?: true
    completedAt?: true
    isCheckIn?: true
    isResponseCheck?: true
    isEmailSentCheck?: true
  }

  export type ReminderMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    leadId?: true
    touchPointId?: true
    type?: true
    dueDate?: true
    note?: true
    completed?: true
    completedAt?: true
    isCheckIn?: true
    isResponseCheck?: true
    isEmailSentCheck?: true
  }

  export type ReminderCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    leadId?: true
    touchPointId?: true
    type?: true
    dueDate?: true
    note?: true
    completed?: true
    completedAt?: true
    isCheckIn?: true
    isResponseCheck?: true
    isEmailSentCheck?: true
    _all?: true
  }

  export type ReminderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reminder to aggregate.
     */
    where?: ReminderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reminders to fetch.
     */
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReminderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reminders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reminders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reminders
    **/
    _count?: true | ReminderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReminderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReminderMaxAggregateInputType
  }

  export type GetReminderAggregateType<T extends ReminderAggregateArgs> = {
        [P in keyof T & keyof AggregateReminder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReminder[P]>
      : GetScalarType<T[P], AggregateReminder[P]>
  }




  export type ReminderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReminderWhereInput
    orderBy?: ReminderOrderByWithAggregationInput | ReminderOrderByWithAggregationInput[]
    by: ReminderScalarFieldEnum[] | ReminderScalarFieldEnum
    having?: ReminderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReminderCountAggregateInputType | true
    _min?: ReminderMinAggregateInputType
    _max?: ReminderMaxAggregateInputType
  }

  export type ReminderGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    leadId: string
    touchPointId: string | null
    type: $Enums.TouchPointType
    dueDate: Date
    note: string | null
    completed: boolean
    completedAt: Date | null
    isCheckIn: boolean
    isResponseCheck: boolean
    isEmailSentCheck: boolean
    _count: ReminderCountAggregateOutputType | null
    _min: ReminderMinAggregateOutputType | null
    _max: ReminderMaxAggregateOutputType | null
  }

  type GetReminderGroupByPayload<T extends ReminderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReminderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReminderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReminderGroupByOutputType[P]>
            : GetScalarType<T[P], ReminderGroupByOutputType[P]>
        }
      >
    >


  export type ReminderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    leadId?: boolean
    touchPointId?: boolean
    type?: boolean
    dueDate?: boolean
    note?: boolean
    completed?: boolean
    completedAt?: boolean
    isCheckIn?: boolean
    isResponseCheck?: boolean
    isEmailSentCheck?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    touchPoint?: boolean | Reminder$touchPointArgs<ExtArgs>
  }, ExtArgs["result"]["reminder"]>

  export type ReminderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    leadId?: boolean
    touchPointId?: boolean
    type?: boolean
    dueDate?: boolean
    note?: boolean
    completed?: boolean
    completedAt?: boolean
    isCheckIn?: boolean
    isResponseCheck?: boolean
    isEmailSentCheck?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    touchPoint?: boolean | Reminder$touchPointArgs<ExtArgs>
  }, ExtArgs["result"]["reminder"]>

  export type ReminderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    leadId?: boolean
    touchPointId?: boolean
    type?: boolean
    dueDate?: boolean
    note?: boolean
    completed?: boolean
    completedAt?: boolean
    isCheckIn?: boolean
    isResponseCheck?: boolean
    isEmailSentCheck?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    touchPoint?: boolean | Reminder$touchPointArgs<ExtArgs>
  }, ExtArgs["result"]["reminder"]>

  export type ReminderSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    leadId?: boolean
    touchPointId?: boolean
    type?: boolean
    dueDate?: boolean
    note?: boolean
    completed?: boolean
    completedAt?: boolean
    isCheckIn?: boolean
    isResponseCheck?: boolean
    isEmailSentCheck?: boolean
  }

  export type ReminderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "leadId" | "touchPointId" | "type" | "dueDate" | "note" | "completed" | "completedAt" | "isCheckIn" | "isResponseCheck" | "isEmailSentCheck", ExtArgs["result"]["reminder"]>
  export type ReminderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    touchPoint?: boolean | Reminder$touchPointArgs<ExtArgs>
  }
  export type ReminderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    touchPoint?: boolean | Reminder$touchPointArgs<ExtArgs>
  }
  export type ReminderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    touchPoint?: boolean | Reminder$touchPointArgs<ExtArgs>
  }

  export type $ReminderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Reminder"
    objects: {
      lead: Prisma.$LeadPayload<ExtArgs>
      touchPoint: Prisma.$TouchPointPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      leadId: string
      touchPointId: string | null
      type: $Enums.TouchPointType
      dueDate: Date
      note: string | null
      completed: boolean
      completedAt: Date | null
      isCheckIn: boolean
      isResponseCheck: boolean
      isEmailSentCheck: boolean
    }, ExtArgs["result"]["reminder"]>
    composites: {}
  }

  type ReminderGetPayload<S extends boolean | null | undefined | ReminderDefaultArgs> = $Result.GetResult<Prisma.$ReminderPayload, S>

  type ReminderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReminderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReminderCountAggregateInputType | true
    }

  export interface ReminderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Reminder'], meta: { name: 'Reminder' } }
    /**
     * Find zero or one Reminder that matches the filter.
     * @param {ReminderFindUniqueArgs} args - Arguments to find a Reminder
     * @example
     * // Get one Reminder
     * const reminder = await prisma.reminder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReminderFindUniqueArgs>(args: SelectSubset<T, ReminderFindUniqueArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Reminder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReminderFindUniqueOrThrowArgs} args - Arguments to find a Reminder
     * @example
     * // Get one Reminder
     * const reminder = await prisma.reminder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReminderFindUniqueOrThrowArgs>(args: SelectSubset<T, ReminderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reminder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderFindFirstArgs} args - Arguments to find a Reminder
     * @example
     * // Get one Reminder
     * const reminder = await prisma.reminder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReminderFindFirstArgs>(args?: SelectSubset<T, ReminderFindFirstArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reminder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderFindFirstOrThrowArgs} args - Arguments to find a Reminder
     * @example
     * // Get one Reminder
     * const reminder = await prisma.reminder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReminderFindFirstOrThrowArgs>(args?: SelectSubset<T, ReminderFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reminders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reminders
     * const reminders = await prisma.reminder.findMany()
     * 
     * // Get first 10 Reminders
     * const reminders = await prisma.reminder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reminderWithIdOnly = await prisma.reminder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReminderFindManyArgs>(args?: SelectSubset<T, ReminderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Reminder.
     * @param {ReminderCreateArgs} args - Arguments to create a Reminder.
     * @example
     * // Create one Reminder
     * const Reminder = await prisma.reminder.create({
     *   data: {
     *     // ... data to create a Reminder
     *   }
     * })
     * 
     */
    create<T extends ReminderCreateArgs>(args: SelectSubset<T, ReminderCreateArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reminders.
     * @param {ReminderCreateManyArgs} args - Arguments to create many Reminders.
     * @example
     * // Create many Reminders
     * const reminder = await prisma.reminder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReminderCreateManyArgs>(args?: SelectSubset<T, ReminderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reminders and returns the data saved in the database.
     * @param {ReminderCreateManyAndReturnArgs} args - Arguments to create many Reminders.
     * @example
     * // Create many Reminders
     * const reminder = await prisma.reminder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reminders and only return the `id`
     * const reminderWithIdOnly = await prisma.reminder.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReminderCreateManyAndReturnArgs>(args?: SelectSubset<T, ReminderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Reminder.
     * @param {ReminderDeleteArgs} args - Arguments to delete one Reminder.
     * @example
     * // Delete one Reminder
     * const Reminder = await prisma.reminder.delete({
     *   where: {
     *     // ... filter to delete one Reminder
     *   }
     * })
     * 
     */
    delete<T extends ReminderDeleteArgs>(args: SelectSubset<T, ReminderDeleteArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Reminder.
     * @param {ReminderUpdateArgs} args - Arguments to update one Reminder.
     * @example
     * // Update one Reminder
     * const reminder = await prisma.reminder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReminderUpdateArgs>(args: SelectSubset<T, ReminderUpdateArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reminders.
     * @param {ReminderDeleteManyArgs} args - Arguments to filter Reminders to delete.
     * @example
     * // Delete a few Reminders
     * const { count } = await prisma.reminder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReminderDeleteManyArgs>(args?: SelectSubset<T, ReminderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reminders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reminders
     * const reminder = await prisma.reminder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReminderUpdateManyArgs>(args: SelectSubset<T, ReminderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reminders and returns the data updated in the database.
     * @param {ReminderUpdateManyAndReturnArgs} args - Arguments to update many Reminders.
     * @example
     * // Update many Reminders
     * const reminder = await prisma.reminder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reminders and only return the `id`
     * const reminderWithIdOnly = await prisma.reminder.updateManyAndReturn({
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
    updateManyAndReturn<T extends ReminderUpdateManyAndReturnArgs>(args: SelectSubset<T, ReminderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Reminder.
     * @param {ReminderUpsertArgs} args - Arguments to update or create a Reminder.
     * @example
     * // Update or create a Reminder
     * const reminder = await prisma.reminder.upsert({
     *   create: {
     *     // ... data to create a Reminder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reminder we want to update
     *   }
     * })
     */
    upsert<T extends ReminderUpsertArgs>(args: SelectSubset<T, ReminderUpsertArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reminders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderCountArgs} args - Arguments to filter Reminders to count.
     * @example
     * // Count the number of Reminders
     * const count = await prisma.reminder.count({
     *   where: {
     *     // ... the filter for the Reminders we want to count
     *   }
     * })
    **/
    count<T extends ReminderCountArgs>(
      args?: Subset<T, ReminderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReminderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reminder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReminderAggregateArgs>(args: Subset<T, ReminderAggregateArgs>): Prisma.PrismaPromise<GetReminderAggregateType<T>>

    /**
     * Group by Reminder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderGroupByArgs} args - Group by arguments.
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
      T extends ReminderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReminderGroupByArgs['orderBy'] }
        : { orderBy?: ReminderGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ReminderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReminderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Reminder model
   */
  readonly fields: ReminderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Reminder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReminderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends LeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeadDefaultArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    touchPoint<T extends Reminder$touchPointArgs<ExtArgs> = {}>(args?: Subset<T, Reminder$touchPointArgs<ExtArgs>>): Prisma__TouchPointClient<$Result.GetResult<Prisma.$TouchPointPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Reminder model
   */
  interface ReminderFieldRefs {
    readonly id: FieldRef<"Reminder", 'String'>
    readonly createdAt: FieldRef<"Reminder", 'DateTime'>
    readonly updatedAt: FieldRef<"Reminder", 'DateTime'>
    readonly leadId: FieldRef<"Reminder", 'String'>
    readonly touchPointId: FieldRef<"Reminder", 'String'>
    readonly type: FieldRef<"Reminder", 'TouchPointType'>
    readonly dueDate: FieldRef<"Reminder", 'DateTime'>
    readonly note: FieldRef<"Reminder", 'String'>
    readonly completed: FieldRef<"Reminder", 'Boolean'>
    readonly completedAt: FieldRef<"Reminder", 'DateTime'>
    readonly isCheckIn: FieldRef<"Reminder", 'Boolean'>
    readonly isResponseCheck: FieldRef<"Reminder", 'Boolean'>
    readonly isEmailSentCheck: FieldRef<"Reminder", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Reminder findUnique
   */
  export type ReminderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter, which Reminder to fetch.
     */
    where: ReminderWhereUniqueInput
  }

  /**
   * Reminder findUniqueOrThrow
   */
  export type ReminderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter, which Reminder to fetch.
     */
    where: ReminderWhereUniqueInput
  }

  /**
   * Reminder findFirst
   */
  export type ReminderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter, which Reminder to fetch.
     */
    where?: ReminderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reminders to fetch.
     */
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reminders.
     */
    cursor?: ReminderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reminders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reminders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reminders.
     */
    distinct?: ReminderScalarFieldEnum | ReminderScalarFieldEnum[]
  }

  /**
   * Reminder findFirstOrThrow
   */
  export type ReminderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter, which Reminder to fetch.
     */
    where?: ReminderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reminders to fetch.
     */
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reminders.
     */
    cursor?: ReminderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reminders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reminders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reminders.
     */
    distinct?: ReminderScalarFieldEnum | ReminderScalarFieldEnum[]
  }

  /**
   * Reminder findMany
   */
  export type ReminderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter, which Reminders to fetch.
     */
    where?: ReminderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reminders to fetch.
     */
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reminders.
     */
    cursor?: ReminderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reminders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reminders.
     */
    skip?: number
    distinct?: ReminderScalarFieldEnum | ReminderScalarFieldEnum[]
  }

  /**
   * Reminder create
   */
  export type ReminderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * The data needed to create a Reminder.
     */
    data: XOR<ReminderCreateInput, ReminderUncheckedCreateInput>
  }

  /**
   * Reminder createMany
   */
  export type ReminderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reminders.
     */
    data: ReminderCreateManyInput | ReminderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Reminder createManyAndReturn
   */
  export type ReminderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * The data used to create many Reminders.
     */
    data: ReminderCreateManyInput | ReminderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reminder update
   */
  export type ReminderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * The data needed to update a Reminder.
     */
    data: XOR<ReminderUpdateInput, ReminderUncheckedUpdateInput>
    /**
     * Choose, which Reminder to update.
     */
    where: ReminderWhereUniqueInput
  }

  /**
   * Reminder updateMany
   */
  export type ReminderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reminders.
     */
    data: XOR<ReminderUpdateManyMutationInput, ReminderUncheckedUpdateManyInput>
    /**
     * Filter which Reminders to update
     */
    where?: ReminderWhereInput
    /**
     * Limit how many Reminders to update.
     */
    limit?: number
  }

  /**
   * Reminder updateManyAndReturn
   */
  export type ReminderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * The data used to update Reminders.
     */
    data: XOR<ReminderUpdateManyMutationInput, ReminderUncheckedUpdateManyInput>
    /**
     * Filter which Reminders to update
     */
    where?: ReminderWhereInput
    /**
     * Limit how many Reminders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reminder upsert
   */
  export type ReminderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * The filter to search for the Reminder to update in case it exists.
     */
    where: ReminderWhereUniqueInput
    /**
     * In case the Reminder found by the `where` argument doesn't exist, create a new Reminder with this data.
     */
    create: XOR<ReminderCreateInput, ReminderUncheckedCreateInput>
    /**
     * In case the Reminder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReminderUpdateInput, ReminderUncheckedUpdateInput>
  }

  /**
   * Reminder delete
   */
  export type ReminderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter which Reminder to delete.
     */
    where: ReminderWhereUniqueInput
  }

  /**
   * Reminder deleteMany
   */
  export type ReminderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reminders to delete
     */
    where?: ReminderWhereInput
    /**
     * Limit how many Reminders to delete.
     */
    limit?: number
  }

  /**
   * Reminder.touchPoint
   */
  export type Reminder$touchPointArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TouchPoint
     */
    select?: TouchPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TouchPoint
     */
    omit?: TouchPointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TouchPointInclude<ExtArgs> | null
    where?: TouchPointWhereInput
  }

  /**
   * Reminder without action
   */
  export type ReminderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    password: 'password',
    role: 'role'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const LeadScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    business: 'business',
    primaryLocationId: 'primaryLocationId',
    industryId: 'industryId',
    businessTypeId: 'businessTypeId',
    igHandle: 'igHandle',
    igFollowerCount: 'igFollowerCount',
    email: 'email',
    website: 'website',
    pipelineStage: 'pipelineStage',
    source: 'source',
    discoveredVia: 'discoveredVia',
    discoveredViaOther: 'discoveredViaOther',
    convertedAt: 'convertedAt',
    isBlackOwned: 'isBlackOwned',
    isWomanOwned: 'isWomanOwned',
    isLatinoOwned: 'isLatinoOwned',
    isImmigrantOwned: 'isImmigrantOwned',
    priority: 'priority',
    sequenceStep: 'sequenceStep',
    sequenceActive: 'sequenceActive',
    isHot: 'isHot',
    assignedToId: 'assignedToId',
    referredByLeadId: 'referredByLeadId',
    referredByName: 'referredByName',
    instagramHandle: 'instagramHandle',
    instagramFollowers: 'instagramFollowers',
    tiktokHandle: 'tiktokHandle',
    tiktokFollowers: 'tiktokFollowers',
    youtubeHandle: 'youtubeHandle',
    youtubeFollowers: 'youtubeFollowers',
    facebookHandle: 'facebookHandle',
    facebookFollowers: 'facebookFollowers'
  };

  export type LeadScalarFieldEnum = (typeof LeadScalarFieldEnum)[keyof typeof LeadScalarFieldEnum]


  export const ContactScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    firstName: 'firstName',
    lastName: 'lastName',
    title: 'title',
    email: 'email',
    phone: 'phone',
    isDecisionMaker: 'isDecisionMaker',
    notes: 'notes',
    leadId: 'leadId'
  };

  export type ContactScalarFieldEnum = (typeof ContactScalarFieldEnum)[keyof typeof ContactScalarFieldEnum]


  export const IndustryScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    name: 'name'
  };

  export type IndustryScalarFieldEnum = (typeof IndustryScalarFieldEnum)[keyof typeof IndustryScalarFieldEnum]


  export const BusinessTypeScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    name: 'name'
  };

  export type BusinessTypeScalarFieldEnum = (typeof BusinessTypeScalarFieldEnum)[keyof typeof BusinessTypeScalarFieldEnum]


  export const LocationScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    businessId: 'businessId',
    addressLine1: 'addressLine1',
    addressLine2: 'addressLine2',
    city: 'city',
    state: 'state',
    zip: 'zip'
  };

  export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum]


  export const PhoneNumberScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    number: 'number',
    label: 'label',
    locationId: 'locationId'
  };

  export type PhoneNumberScalarFieldEnum = (typeof PhoneNumberScalarFieldEnum)[keyof typeof PhoneNumberScalarFieldEnum]


  export const NoteScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    text: 'text',
    leadId: 'leadId',
    userId: 'userId'
  };

  export type NoteScalarFieldEnum = (typeof NoteScalarFieldEnum)[keyof typeof NoteScalarFieldEnum]


  export const TouchPointScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    date: 'date',
    type: 'type',
    leadId: 'leadId',
    contactedById: 'contactedById',
    receivedResponse: 'receivedResponse',
    summary: 'summary',
    sequencePosition: 'sequencePosition'
  };

  export type TouchPointScalarFieldEnum = (typeof TouchPointScalarFieldEnum)[keyof typeof TouchPointScalarFieldEnum]


  export const ReminderScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    leadId: 'leadId',
    touchPointId: 'touchPointId',
    type: 'type',
    dueDate: 'dueDate',
    note: 'note',
    completed: 'completed',
    completedAt: 'completedAt',
    isCheckIn: 'isCheckIn',
    isResponseCheck: 'isResponseCheck',
    isEmailSentCheck: 'isEmailSentCheck'
  };

  export type ReminderScalarFieldEnum = (typeof ReminderScalarFieldEnum)[keyof typeof ReminderScalarFieldEnum]


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
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'PipelineStage'
   */
  export type EnumPipelineStageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PipelineStage'>
    


  /**
   * Reference to a field of type 'PipelineStage[]'
   */
  export type ListEnumPipelineStageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PipelineStage[]'>
    


  /**
   * Reference to a field of type 'LeadSource'
   */
  export type EnumLeadSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeadSource'>
    


  /**
   * Reference to a field of type 'LeadSource[]'
   */
  export type ListEnumLeadSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeadSource[]'>
    


  /**
   * Reference to a field of type 'DiscoveredVia'
   */
  export type EnumDiscoveredViaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DiscoveredVia'>
    


  /**
   * Reference to a field of type 'DiscoveredVia[]'
   */
  export type ListEnumDiscoveredViaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DiscoveredVia[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Priority'
   */
  export type EnumPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Priority'>
    


  /**
   * Reference to a field of type 'Priority[]'
   */
  export type ListEnumPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Priority[]'>
    


  /**
   * Reference to a field of type 'PhoneType'
   */
  export type EnumPhoneTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PhoneType'>
    


  /**
   * Reference to a field of type 'PhoneType[]'
   */
  export type ListEnumPhoneTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PhoneType[]'>
    


  /**
   * Reference to a field of type 'TouchPointType'
   */
  export type EnumTouchPointTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TouchPointType'>
    


  /**
   * Reference to a field of type 'TouchPointType[]'
   */
  export type ListEnumTouchPointTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TouchPointType[]'>
    


  /**
   * Reference to a field of type 'SequencePosition'
   */
  export type EnumSequencePositionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SequencePosition'>
    


  /**
   * Reference to a field of type 'SequencePosition[]'
   */
  export type ListEnumSequencePositionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SequencePosition[]'>
    


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


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    touchPoints?: TouchPointListRelationFilter
    notes?: NoteListRelationFilter
    assignedLeads?: LeadListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    touchPoints?: TouchPointOrderByRelationAggregateInput
    notes?: NoteOrderByRelationAggregateInput
    assignedLeads?: LeadOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    touchPoints?: TouchPointListRelationFilter
    notes?: NoteListRelationFilter
    assignedLeads?: LeadListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
  }

  export type LeadWhereInput = {
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    id?: StringFilter<"Lead"> | string
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
    business?: StringFilter<"Lead"> | string
    primaryLocationId?: StringNullableFilter<"Lead"> | string | null
    industryId?: StringFilter<"Lead"> | string
    businessTypeId?: StringFilter<"Lead"> | string
    igHandle?: StringNullableFilter<"Lead"> | string | null
    igFollowerCount?: IntNullableFilter<"Lead"> | number | null
    email?: StringNullableFilter<"Lead"> | string | null
    website?: StringNullableFilter<"Lead"> | string | null
    pipelineStage?: EnumPipelineStageFilter<"Lead"> | $Enums.PipelineStage
    source?: EnumLeadSourceNullableFilter<"Lead"> | $Enums.LeadSource | null
    discoveredVia?: EnumDiscoveredViaNullableFilter<"Lead"> | $Enums.DiscoveredVia | null
    discoveredViaOther?: StringNullableFilter<"Lead"> | string | null
    convertedAt?: DateTimeNullableFilter<"Lead"> | Date | string | null
    isBlackOwned?: BoolFilter<"Lead"> | boolean
    isWomanOwned?: BoolFilter<"Lead"> | boolean
    isLatinoOwned?: BoolFilter<"Lead"> | boolean
    isImmigrantOwned?: BoolFilter<"Lead"> | boolean
    priority?: EnumPriorityNullableFilter<"Lead"> | $Enums.Priority | null
    sequenceStep?: IntFilter<"Lead"> | number
    sequenceActive?: BoolFilter<"Lead"> | boolean
    isHot?: BoolFilter<"Lead"> | boolean
    assignedToId?: StringNullableFilter<"Lead"> | string | null
    referredByLeadId?: StringNullableFilter<"Lead"> | string | null
    referredByName?: StringNullableFilter<"Lead"> | string | null
    instagramHandle?: StringNullableFilter<"Lead"> | string | null
    instagramFollowers?: IntNullableFilter<"Lead"> | number | null
    tiktokHandle?: StringNullableFilter<"Lead"> | string | null
    tiktokFollowers?: IntNullableFilter<"Lead"> | number | null
    youtubeHandle?: StringNullableFilter<"Lead"> | string | null
    youtubeFollowers?: IntNullableFilter<"Lead"> | number | null
    facebookHandle?: StringNullableFilter<"Lead"> | string | null
    facebookFollowers?: IntNullableFilter<"Lead"> | number | null
    locations?: LocationListRelationFilter
    primaryLocation?: XOR<LocationNullableScalarRelationFilter, LocationWhereInput> | null
    contacts?: ContactListRelationFilter
    industry?: XOR<IndustryScalarRelationFilter, IndustryWhereInput>
    businessType?: XOR<BusinessTypeScalarRelationFilter, BusinessTypeWhereInput>
    touchPoint?: TouchPointListRelationFilter
    notes?: NoteListRelationFilter
    reminders?: ReminderListRelationFilter
    assignedTo?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    referredByLead?: XOR<LeadNullableScalarRelationFilter, LeadWhereInput> | null
    referrals?: LeadListRelationFilter
  }

  export type LeadOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    business?: SortOrder
    primaryLocationId?: SortOrderInput | SortOrder
    industryId?: SortOrder
    businessTypeId?: SortOrder
    igHandle?: SortOrderInput | SortOrder
    igFollowerCount?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    pipelineStage?: SortOrder
    source?: SortOrderInput | SortOrder
    discoveredVia?: SortOrderInput | SortOrder
    discoveredViaOther?: SortOrderInput | SortOrder
    convertedAt?: SortOrderInput | SortOrder
    isBlackOwned?: SortOrder
    isWomanOwned?: SortOrder
    isLatinoOwned?: SortOrder
    isImmigrantOwned?: SortOrder
    priority?: SortOrderInput | SortOrder
    sequenceStep?: SortOrder
    sequenceActive?: SortOrder
    isHot?: SortOrder
    assignedToId?: SortOrderInput | SortOrder
    referredByLeadId?: SortOrderInput | SortOrder
    referredByName?: SortOrderInput | SortOrder
    instagramHandle?: SortOrderInput | SortOrder
    instagramFollowers?: SortOrderInput | SortOrder
    tiktokHandle?: SortOrderInput | SortOrder
    tiktokFollowers?: SortOrderInput | SortOrder
    youtubeHandle?: SortOrderInput | SortOrder
    youtubeFollowers?: SortOrderInput | SortOrder
    facebookHandle?: SortOrderInput | SortOrder
    facebookFollowers?: SortOrderInput | SortOrder
    locations?: LocationOrderByRelationAggregateInput
    primaryLocation?: LocationOrderByWithRelationInput
    contacts?: ContactOrderByRelationAggregateInput
    industry?: IndustryOrderByWithRelationInput
    businessType?: BusinessTypeOrderByWithRelationInput
    touchPoint?: TouchPointOrderByRelationAggregateInput
    notes?: NoteOrderByRelationAggregateInput
    reminders?: ReminderOrderByRelationAggregateInput
    assignedTo?: UserOrderByWithRelationInput
    referredByLead?: LeadOrderByWithRelationInput
    referrals?: LeadOrderByRelationAggregateInput
  }

  export type LeadWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    primaryLocationId?: string
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
    business?: StringFilter<"Lead"> | string
    industryId?: StringFilter<"Lead"> | string
    businessTypeId?: StringFilter<"Lead"> | string
    igHandle?: StringNullableFilter<"Lead"> | string | null
    igFollowerCount?: IntNullableFilter<"Lead"> | number | null
    email?: StringNullableFilter<"Lead"> | string | null
    website?: StringNullableFilter<"Lead"> | string | null
    pipelineStage?: EnumPipelineStageFilter<"Lead"> | $Enums.PipelineStage
    source?: EnumLeadSourceNullableFilter<"Lead"> | $Enums.LeadSource | null
    discoveredVia?: EnumDiscoveredViaNullableFilter<"Lead"> | $Enums.DiscoveredVia | null
    discoveredViaOther?: StringNullableFilter<"Lead"> | string | null
    convertedAt?: DateTimeNullableFilter<"Lead"> | Date | string | null
    isBlackOwned?: BoolFilter<"Lead"> | boolean
    isWomanOwned?: BoolFilter<"Lead"> | boolean
    isLatinoOwned?: BoolFilter<"Lead"> | boolean
    isImmigrantOwned?: BoolFilter<"Lead"> | boolean
    priority?: EnumPriorityNullableFilter<"Lead"> | $Enums.Priority | null
    sequenceStep?: IntFilter<"Lead"> | number
    sequenceActive?: BoolFilter<"Lead"> | boolean
    isHot?: BoolFilter<"Lead"> | boolean
    assignedToId?: StringNullableFilter<"Lead"> | string | null
    referredByLeadId?: StringNullableFilter<"Lead"> | string | null
    referredByName?: StringNullableFilter<"Lead"> | string | null
    instagramHandle?: StringNullableFilter<"Lead"> | string | null
    instagramFollowers?: IntNullableFilter<"Lead"> | number | null
    tiktokHandle?: StringNullableFilter<"Lead"> | string | null
    tiktokFollowers?: IntNullableFilter<"Lead"> | number | null
    youtubeHandle?: StringNullableFilter<"Lead"> | string | null
    youtubeFollowers?: IntNullableFilter<"Lead"> | number | null
    facebookHandle?: StringNullableFilter<"Lead"> | string | null
    facebookFollowers?: IntNullableFilter<"Lead"> | number | null
    locations?: LocationListRelationFilter
    primaryLocation?: XOR<LocationNullableScalarRelationFilter, LocationWhereInput> | null
    contacts?: ContactListRelationFilter
    industry?: XOR<IndustryScalarRelationFilter, IndustryWhereInput>
    businessType?: XOR<BusinessTypeScalarRelationFilter, BusinessTypeWhereInput>
    touchPoint?: TouchPointListRelationFilter
    notes?: NoteListRelationFilter
    reminders?: ReminderListRelationFilter
    assignedTo?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    referredByLead?: XOR<LeadNullableScalarRelationFilter, LeadWhereInput> | null
    referrals?: LeadListRelationFilter
  }, "id" | "primaryLocationId">

  export type LeadOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    business?: SortOrder
    primaryLocationId?: SortOrderInput | SortOrder
    industryId?: SortOrder
    businessTypeId?: SortOrder
    igHandle?: SortOrderInput | SortOrder
    igFollowerCount?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    pipelineStage?: SortOrder
    source?: SortOrderInput | SortOrder
    discoveredVia?: SortOrderInput | SortOrder
    discoveredViaOther?: SortOrderInput | SortOrder
    convertedAt?: SortOrderInput | SortOrder
    isBlackOwned?: SortOrder
    isWomanOwned?: SortOrder
    isLatinoOwned?: SortOrder
    isImmigrantOwned?: SortOrder
    priority?: SortOrderInput | SortOrder
    sequenceStep?: SortOrder
    sequenceActive?: SortOrder
    isHot?: SortOrder
    assignedToId?: SortOrderInput | SortOrder
    referredByLeadId?: SortOrderInput | SortOrder
    referredByName?: SortOrderInput | SortOrder
    instagramHandle?: SortOrderInput | SortOrder
    instagramFollowers?: SortOrderInput | SortOrder
    tiktokHandle?: SortOrderInput | SortOrder
    tiktokFollowers?: SortOrderInput | SortOrder
    youtubeHandle?: SortOrderInput | SortOrder
    youtubeFollowers?: SortOrderInput | SortOrder
    facebookHandle?: SortOrderInput | SortOrder
    facebookFollowers?: SortOrderInput | SortOrder
    _count?: LeadCountOrderByAggregateInput
    _avg?: LeadAvgOrderByAggregateInput
    _max?: LeadMaxOrderByAggregateInput
    _min?: LeadMinOrderByAggregateInput
    _sum?: LeadSumOrderByAggregateInput
  }

  export type LeadScalarWhereWithAggregatesInput = {
    AND?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    OR?: LeadScalarWhereWithAggregatesInput[]
    NOT?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Lead"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
    business?: StringWithAggregatesFilter<"Lead"> | string
    primaryLocationId?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    industryId?: StringWithAggregatesFilter<"Lead"> | string
    businessTypeId?: StringWithAggregatesFilter<"Lead"> | string
    igHandle?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    igFollowerCount?: IntNullableWithAggregatesFilter<"Lead"> | number | null
    email?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    website?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    pipelineStage?: EnumPipelineStageWithAggregatesFilter<"Lead"> | $Enums.PipelineStage
    source?: EnumLeadSourceNullableWithAggregatesFilter<"Lead"> | $Enums.LeadSource | null
    discoveredVia?: EnumDiscoveredViaNullableWithAggregatesFilter<"Lead"> | $Enums.DiscoveredVia | null
    discoveredViaOther?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    convertedAt?: DateTimeNullableWithAggregatesFilter<"Lead"> | Date | string | null
    isBlackOwned?: BoolWithAggregatesFilter<"Lead"> | boolean
    isWomanOwned?: BoolWithAggregatesFilter<"Lead"> | boolean
    isLatinoOwned?: BoolWithAggregatesFilter<"Lead"> | boolean
    isImmigrantOwned?: BoolWithAggregatesFilter<"Lead"> | boolean
    priority?: EnumPriorityNullableWithAggregatesFilter<"Lead"> | $Enums.Priority | null
    sequenceStep?: IntWithAggregatesFilter<"Lead"> | number
    sequenceActive?: BoolWithAggregatesFilter<"Lead"> | boolean
    isHot?: BoolWithAggregatesFilter<"Lead"> | boolean
    assignedToId?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    referredByLeadId?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    referredByName?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    instagramHandle?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    instagramFollowers?: IntNullableWithAggregatesFilter<"Lead"> | number | null
    tiktokHandle?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    tiktokFollowers?: IntNullableWithAggregatesFilter<"Lead"> | number | null
    youtubeHandle?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    youtubeFollowers?: IntNullableWithAggregatesFilter<"Lead"> | number | null
    facebookHandle?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    facebookFollowers?: IntNullableWithAggregatesFilter<"Lead"> | number | null
  }

  export type ContactWhereInput = {
    AND?: ContactWhereInput | ContactWhereInput[]
    OR?: ContactWhereInput[]
    NOT?: ContactWhereInput | ContactWhereInput[]
    id?: StringFilter<"Contact"> | string
    createdAt?: DateTimeFilter<"Contact"> | Date | string
    updatedAt?: DateTimeFilter<"Contact"> | Date | string
    firstName?: StringFilter<"Contact"> | string
    lastName?: StringFilter<"Contact"> | string
    title?: StringNullableFilter<"Contact"> | string | null
    email?: StringNullableFilter<"Contact"> | string | null
    phone?: StringNullableFilter<"Contact"> | string | null
    isDecisionMaker?: BoolFilter<"Contact"> | boolean
    notes?: StringNullableFilter<"Contact"> | string | null
    leadId?: StringFilter<"Contact"> | string
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
  }

  export type ContactOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    title?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    isDecisionMaker?: SortOrder
    notes?: SortOrderInput | SortOrder
    leadId?: SortOrder
    lead?: LeadOrderByWithRelationInput
  }

  export type ContactWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ContactWhereInput | ContactWhereInput[]
    OR?: ContactWhereInput[]
    NOT?: ContactWhereInput | ContactWhereInput[]
    createdAt?: DateTimeFilter<"Contact"> | Date | string
    updatedAt?: DateTimeFilter<"Contact"> | Date | string
    firstName?: StringFilter<"Contact"> | string
    lastName?: StringFilter<"Contact"> | string
    title?: StringNullableFilter<"Contact"> | string | null
    email?: StringNullableFilter<"Contact"> | string | null
    phone?: StringNullableFilter<"Contact"> | string | null
    isDecisionMaker?: BoolFilter<"Contact"> | boolean
    notes?: StringNullableFilter<"Contact"> | string | null
    leadId?: StringFilter<"Contact"> | string
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
  }, "id">

  export type ContactOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    title?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    isDecisionMaker?: SortOrder
    notes?: SortOrderInput | SortOrder
    leadId?: SortOrder
    _count?: ContactCountOrderByAggregateInput
    _max?: ContactMaxOrderByAggregateInput
    _min?: ContactMinOrderByAggregateInput
  }

  export type ContactScalarWhereWithAggregatesInput = {
    AND?: ContactScalarWhereWithAggregatesInput | ContactScalarWhereWithAggregatesInput[]
    OR?: ContactScalarWhereWithAggregatesInput[]
    NOT?: ContactScalarWhereWithAggregatesInput | ContactScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Contact"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Contact"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Contact"> | Date | string
    firstName?: StringWithAggregatesFilter<"Contact"> | string
    lastName?: StringWithAggregatesFilter<"Contact"> | string
    title?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    email?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    isDecisionMaker?: BoolWithAggregatesFilter<"Contact"> | boolean
    notes?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    leadId?: StringWithAggregatesFilter<"Contact"> | string
  }

  export type IndustryWhereInput = {
    AND?: IndustryWhereInput | IndustryWhereInput[]
    OR?: IndustryWhereInput[]
    NOT?: IndustryWhereInput | IndustryWhereInput[]
    id?: StringFilter<"Industry"> | string
    createdAt?: DateTimeFilter<"Industry"> | Date | string
    updatedAt?: DateTimeFilter<"Industry"> | Date | string
    name?: StringFilter<"Industry"> | string
    leads?: LeadListRelationFilter
  }

  export type IndustryOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    leads?: LeadOrderByRelationAggregateInput
  }

  export type IndustryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: IndustryWhereInput | IndustryWhereInput[]
    OR?: IndustryWhereInput[]
    NOT?: IndustryWhereInput | IndustryWhereInput[]
    createdAt?: DateTimeFilter<"Industry"> | Date | string
    updatedAt?: DateTimeFilter<"Industry"> | Date | string
    leads?: LeadListRelationFilter
  }, "id" | "name">

  export type IndustryOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    _count?: IndustryCountOrderByAggregateInput
    _max?: IndustryMaxOrderByAggregateInput
    _min?: IndustryMinOrderByAggregateInput
  }

  export type IndustryScalarWhereWithAggregatesInput = {
    AND?: IndustryScalarWhereWithAggregatesInput | IndustryScalarWhereWithAggregatesInput[]
    OR?: IndustryScalarWhereWithAggregatesInput[]
    NOT?: IndustryScalarWhereWithAggregatesInput | IndustryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Industry"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Industry"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Industry"> | Date | string
    name?: StringWithAggregatesFilter<"Industry"> | string
  }

  export type BusinessTypeWhereInput = {
    AND?: BusinessTypeWhereInput | BusinessTypeWhereInput[]
    OR?: BusinessTypeWhereInput[]
    NOT?: BusinessTypeWhereInput | BusinessTypeWhereInput[]
    id?: StringFilter<"BusinessType"> | string
    createdAt?: DateTimeFilter<"BusinessType"> | Date | string
    updatedAt?: DateTimeFilter<"BusinessType"> | Date | string
    name?: StringFilter<"BusinessType"> | string
    leads?: LeadListRelationFilter
  }

  export type BusinessTypeOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    leads?: LeadOrderByRelationAggregateInput
  }

  export type BusinessTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: BusinessTypeWhereInput | BusinessTypeWhereInput[]
    OR?: BusinessTypeWhereInput[]
    NOT?: BusinessTypeWhereInput | BusinessTypeWhereInput[]
    createdAt?: DateTimeFilter<"BusinessType"> | Date | string
    updatedAt?: DateTimeFilter<"BusinessType"> | Date | string
    leads?: LeadListRelationFilter
  }, "id" | "name">

  export type BusinessTypeOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    _count?: BusinessTypeCountOrderByAggregateInput
    _max?: BusinessTypeMaxOrderByAggregateInput
    _min?: BusinessTypeMinOrderByAggregateInput
  }

  export type BusinessTypeScalarWhereWithAggregatesInput = {
    AND?: BusinessTypeScalarWhereWithAggregatesInput | BusinessTypeScalarWhereWithAggregatesInput[]
    OR?: BusinessTypeScalarWhereWithAggregatesInput[]
    NOT?: BusinessTypeScalarWhereWithAggregatesInput | BusinessTypeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BusinessType"> | string
    createdAt?: DateTimeWithAggregatesFilter<"BusinessType"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BusinessType"> | Date | string
    name?: StringWithAggregatesFilter<"BusinessType"> | string
  }

  export type LocationWhereInput = {
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    id?: StringFilter<"Location"> | string
    createdAt?: DateTimeFilter<"Location"> | Date | string
    updatedAt?: DateTimeFilter<"Location"> | Date | string
    businessId?: StringFilter<"Location"> | string
    addressLine1?: StringFilter<"Location"> | string
    addressLine2?: StringNullableFilter<"Location"> | string | null
    city?: StringFilter<"Location"> | string
    state?: StringFilter<"Location"> | string
    zip?: StringFilter<"Location"> | string
    business?: XOR<LeadScalarRelationFilter, LeadWhereInput>
    phoneNumbers?: PhoneNumberListRelationFilter
    primaryForBusiness?: XOR<LeadNullableScalarRelationFilter, LeadWhereInput> | null
  }

  export type LocationOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    businessId?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrderInput | SortOrder
    city?: SortOrder
    state?: SortOrder
    zip?: SortOrder
    business?: LeadOrderByWithRelationInput
    phoneNumbers?: PhoneNumberOrderByRelationAggregateInput
    primaryForBusiness?: LeadOrderByWithRelationInput
  }

  export type LocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    createdAt?: DateTimeFilter<"Location"> | Date | string
    updatedAt?: DateTimeFilter<"Location"> | Date | string
    businessId?: StringFilter<"Location"> | string
    addressLine1?: StringFilter<"Location"> | string
    addressLine2?: StringNullableFilter<"Location"> | string | null
    city?: StringFilter<"Location"> | string
    state?: StringFilter<"Location"> | string
    zip?: StringFilter<"Location"> | string
    business?: XOR<LeadScalarRelationFilter, LeadWhereInput>
    phoneNumbers?: PhoneNumberListRelationFilter
    primaryForBusiness?: XOR<LeadNullableScalarRelationFilter, LeadWhereInput> | null
  }, "id">

  export type LocationOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    businessId?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrderInput | SortOrder
    city?: SortOrder
    state?: SortOrder
    zip?: SortOrder
    _count?: LocationCountOrderByAggregateInput
    _max?: LocationMaxOrderByAggregateInput
    _min?: LocationMinOrderByAggregateInput
  }

  export type LocationScalarWhereWithAggregatesInput = {
    AND?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    OR?: LocationScalarWhereWithAggregatesInput[]
    NOT?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Location"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Location"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Location"> | Date | string
    businessId?: StringWithAggregatesFilter<"Location"> | string
    addressLine1?: StringWithAggregatesFilter<"Location"> | string
    addressLine2?: StringNullableWithAggregatesFilter<"Location"> | string | null
    city?: StringWithAggregatesFilter<"Location"> | string
    state?: StringWithAggregatesFilter<"Location"> | string
    zip?: StringWithAggregatesFilter<"Location"> | string
  }

  export type PhoneNumberWhereInput = {
    AND?: PhoneNumberWhereInput | PhoneNumberWhereInput[]
    OR?: PhoneNumberWhereInput[]
    NOT?: PhoneNumberWhereInput | PhoneNumberWhereInput[]
    id?: StringFilter<"PhoneNumber"> | string
    createdAt?: DateTimeFilter<"PhoneNumber"> | Date | string
    updatedAt?: DateTimeFilter<"PhoneNumber"> | Date | string
    number?: StringFilter<"PhoneNumber"> | string
    label?: EnumPhoneTypeNullableFilter<"PhoneNumber"> | $Enums.PhoneType | null
    locationId?: StringNullableFilter<"PhoneNumber"> | string | null
    location?: XOR<LocationNullableScalarRelationFilter, LocationWhereInput> | null
  }

  export type PhoneNumberOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    number?: SortOrder
    label?: SortOrderInput | SortOrder
    locationId?: SortOrderInput | SortOrder
    location?: LocationOrderByWithRelationInput
  }

  export type PhoneNumberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PhoneNumberWhereInput | PhoneNumberWhereInput[]
    OR?: PhoneNumberWhereInput[]
    NOT?: PhoneNumberWhereInput | PhoneNumberWhereInput[]
    createdAt?: DateTimeFilter<"PhoneNumber"> | Date | string
    updatedAt?: DateTimeFilter<"PhoneNumber"> | Date | string
    number?: StringFilter<"PhoneNumber"> | string
    label?: EnumPhoneTypeNullableFilter<"PhoneNumber"> | $Enums.PhoneType | null
    locationId?: StringNullableFilter<"PhoneNumber"> | string | null
    location?: XOR<LocationNullableScalarRelationFilter, LocationWhereInput> | null
  }, "id">

  export type PhoneNumberOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    number?: SortOrder
    label?: SortOrderInput | SortOrder
    locationId?: SortOrderInput | SortOrder
    _count?: PhoneNumberCountOrderByAggregateInput
    _max?: PhoneNumberMaxOrderByAggregateInput
    _min?: PhoneNumberMinOrderByAggregateInput
  }

  export type PhoneNumberScalarWhereWithAggregatesInput = {
    AND?: PhoneNumberScalarWhereWithAggregatesInput | PhoneNumberScalarWhereWithAggregatesInput[]
    OR?: PhoneNumberScalarWhereWithAggregatesInput[]
    NOT?: PhoneNumberScalarWhereWithAggregatesInput | PhoneNumberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PhoneNumber"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PhoneNumber"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PhoneNumber"> | Date | string
    number?: StringWithAggregatesFilter<"PhoneNumber"> | string
    label?: EnumPhoneTypeNullableWithAggregatesFilter<"PhoneNumber"> | $Enums.PhoneType | null
    locationId?: StringNullableWithAggregatesFilter<"PhoneNumber"> | string | null
  }

  export type NoteWhereInput = {
    AND?: NoteWhereInput | NoteWhereInput[]
    OR?: NoteWhereInput[]
    NOT?: NoteWhereInput | NoteWhereInput[]
    id?: StringFilter<"Note"> | string
    createdAt?: DateTimeFilter<"Note"> | Date | string
    updatedAt?: DateTimeFilter<"Note"> | Date | string
    text?: StringFilter<"Note"> | string
    leadId?: StringFilter<"Note"> | string
    userId?: StringFilter<"Note"> | string
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NoteOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    text?: SortOrder
    leadId?: SortOrder
    userId?: SortOrder
    lead?: LeadOrderByWithRelationInput
    author?: UserOrderByWithRelationInput
  }

  export type NoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NoteWhereInput | NoteWhereInput[]
    OR?: NoteWhereInput[]
    NOT?: NoteWhereInput | NoteWhereInput[]
    createdAt?: DateTimeFilter<"Note"> | Date | string
    updatedAt?: DateTimeFilter<"Note"> | Date | string
    text?: StringFilter<"Note"> | string
    leadId?: StringFilter<"Note"> | string
    userId?: StringFilter<"Note"> | string
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type NoteOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    text?: SortOrder
    leadId?: SortOrder
    userId?: SortOrder
    _count?: NoteCountOrderByAggregateInput
    _max?: NoteMaxOrderByAggregateInput
    _min?: NoteMinOrderByAggregateInput
  }

  export type NoteScalarWhereWithAggregatesInput = {
    AND?: NoteScalarWhereWithAggregatesInput | NoteScalarWhereWithAggregatesInput[]
    OR?: NoteScalarWhereWithAggregatesInput[]
    NOT?: NoteScalarWhereWithAggregatesInput | NoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Note"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Note"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Note"> | Date | string
    text?: StringWithAggregatesFilter<"Note"> | string
    leadId?: StringWithAggregatesFilter<"Note"> | string
    userId?: StringWithAggregatesFilter<"Note"> | string
  }

  export type TouchPointWhereInput = {
    AND?: TouchPointWhereInput | TouchPointWhereInput[]
    OR?: TouchPointWhereInput[]
    NOT?: TouchPointWhereInput | TouchPointWhereInput[]
    id?: StringFilter<"TouchPoint"> | string
    createdAt?: DateTimeFilter<"TouchPoint"> | Date | string
    updatedAt?: DateTimeFilter<"TouchPoint"> | Date | string
    date?: DateTimeFilter<"TouchPoint"> | Date | string
    type?: EnumTouchPointTypeFilter<"TouchPoint"> | $Enums.TouchPointType
    leadId?: StringFilter<"TouchPoint"> | string
    contactedById?: StringFilter<"TouchPoint"> | string
    receivedResponse?: BoolFilter<"TouchPoint"> | boolean
    summary?: StringNullableFilter<"TouchPoint"> | string | null
    sequencePosition?: EnumSequencePositionNullableFilter<"TouchPoint"> | $Enums.SequencePosition | null
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
    contactedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    reminders?: ReminderListRelationFilter
  }

  export type TouchPointOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    date?: SortOrder
    type?: SortOrder
    leadId?: SortOrder
    contactedById?: SortOrder
    receivedResponse?: SortOrder
    summary?: SortOrderInput | SortOrder
    sequencePosition?: SortOrderInput | SortOrder
    lead?: LeadOrderByWithRelationInput
    contactedBy?: UserOrderByWithRelationInput
    reminders?: ReminderOrderByRelationAggregateInput
  }

  export type TouchPointWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TouchPointWhereInput | TouchPointWhereInput[]
    OR?: TouchPointWhereInput[]
    NOT?: TouchPointWhereInput | TouchPointWhereInput[]
    createdAt?: DateTimeFilter<"TouchPoint"> | Date | string
    updatedAt?: DateTimeFilter<"TouchPoint"> | Date | string
    date?: DateTimeFilter<"TouchPoint"> | Date | string
    type?: EnumTouchPointTypeFilter<"TouchPoint"> | $Enums.TouchPointType
    leadId?: StringFilter<"TouchPoint"> | string
    contactedById?: StringFilter<"TouchPoint"> | string
    receivedResponse?: BoolFilter<"TouchPoint"> | boolean
    summary?: StringNullableFilter<"TouchPoint"> | string | null
    sequencePosition?: EnumSequencePositionNullableFilter<"TouchPoint"> | $Enums.SequencePosition | null
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
    contactedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    reminders?: ReminderListRelationFilter
  }, "id">

  export type TouchPointOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    date?: SortOrder
    type?: SortOrder
    leadId?: SortOrder
    contactedById?: SortOrder
    receivedResponse?: SortOrder
    summary?: SortOrderInput | SortOrder
    sequencePosition?: SortOrderInput | SortOrder
    _count?: TouchPointCountOrderByAggregateInput
    _max?: TouchPointMaxOrderByAggregateInput
    _min?: TouchPointMinOrderByAggregateInput
  }

  export type TouchPointScalarWhereWithAggregatesInput = {
    AND?: TouchPointScalarWhereWithAggregatesInput | TouchPointScalarWhereWithAggregatesInput[]
    OR?: TouchPointScalarWhereWithAggregatesInput[]
    NOT?: TouchPointScalarWhereWithAggregatesInput | TouchPointScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TouchPoint"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TouchPoint"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TouchPoint"> | Date | string
    date?: DateTimeWithAggregatesFilter<"TouchPoint"> | Date | string
    type?: EnumTouchPointTypeWithAggregatesFilter<"TouchPoint"> | $Enums.TouchPointType
    leadId?: StringWithAggregatesFilter<"TouchPoint"> | string
    contactedById?: StringWithAggregatesFilter<"TouchPoint"> | string
    receivedResponse?: BoolWithAggregatesFilter<"TouchPoint"> | boolean
    summary?: StringNullableWithAggregatesFilter<"TouchPoint"> | string | null
    sequencePosition?: EnumSequencePositionNullableWithAggregatesFilter<"TouchPoint"> | $Enums.SequencePosition | null
  }

  export type ReminderWhereInput = {
    AND?: ReminderWhereInput | ReminderWhereInput[]
    OR?: ReminderWhereInput[]
    NOT?: ReminderWhereInput | ReminderWhereInput[]
    id?: StringFilter<"Reminder"> | string
    createdAt?: DateTimeFilter<"Reminder"> | Date | string
    updatedAt?: DateTimeFilter<"Reminder"> | Date | string
    leadId?: StringFilter<"Reminder"> | string
    touchPointId?: StringNullableFilter<"Reminder"> | string | null
    type?: EnumTouchPointTypeFilter<"Reminder"> | $Enums.TouchPointType
    dueDate?: DateTimeFilter<"Reminder"> | Date | string
    note?: StringNullableFilter<"Reminder"> | string | null
    completed?: BoolFilter<"Reminder"> | boolean
    completedAt?: DateTimeNullableFilter<"Reminder"> | Date | string | null
    isCheckIn?: BoolFilter<"Reminder"> | boolean
    isResponseCheck?: BoolFilter<"Reminder"> | boolean
    isEmailSentCheck?: BoolFilter<"Reminder"> | boolean
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
    touchPoint?: XOR<TouchPointNullableScalarRelationFilter, TouchPointWhereInput> | null
  }

  export type ReminderOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    leadId?: SortOrder
    touchPointId?: SortOrderInput | SortOrder
    type?: SortOrder
    dueDate?: SortOrder
    note?: SortOrderInput | SortOrder
    completed?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    isCheckIn?: SortOrder
    isResponseCheck?: SortOrder
    isEmailSentCheck?: SortOrder
    lead?: LeadOrderByWithRelationInput
    touchPoint?: TouchPointOrderByWithRelationInput
  }

  export type ReminderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReminderWhereInput | ReminderWhereInput[]
    OR?: ReminderWhereInput[]
    NOT?: ReminderWhereInput | ReminderWhereInput[]
    createdAt?: DateTimeFilter<"Reminder"> | Date | string
    updatedAt?: DateTimeFilter<"Reminder"> | Date | string
    leadId?: StringFilter<"Reminder"> | string
    touchPointId?: StringNullableFilter<"Reminder"> | string | null
    type?: EnumTouchPointTypeFilter<"Reminder"> | $Enums.TouchPointType
    dueDate?: DateTimeFilter<"Reminder"> | Date | string
    note?: StringNullableFilter<"Reminder"> | string | null
    completed?: BoolFilter<"Reminder"> | boolean
    completedAt?: DateTimeNullableFilter<"Reminder"> | Date | string | null
    isCheckIn?: BoolFilter<"Reminder"> | boolean
    isResponseCheck?: BoolFilter<"Reminder"> | boolean
    isEmailSentCheck?: BoolFilter<"Reminder"> | boolean
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
    touchPoint?: XOR<TouchPointNullableScalarRelationFilter, TouchPointWhereInput> | null
  }, "id">

  export type ReminderOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    leadId?: SortOrder
    touchPointId?: SortOrderInput | SortOrder
    type?: SortOrder
    dueDate?: SortOrder
    note?: SortOrderInput | SortOrder
    completed?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    isCheckIn?: SortOrder
    isResponseCheck?: SortOrder
    isEmailSentCheck?: SortOrder
    _count?: ReminderCountOrderByAggregateInput
    _max?: ReminderMaxOrderByAggregateInput
    _min?: ReminderMinOrderByAggregateInput
  }

  export type ReminderScalarWhereWithAggregatesInput = {
    AND?: ReminderScalarWhereWithAggregatesInput | ReminderScalarWhereWithAggregatesInput[]
    OR?: ReminderScalarWhereWithAggregatesInput[]
    NOT?: ReminderScalarWhereWithAggregatesInput | ReminderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Reminder"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Reminder"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Reminder"> | Date | string
    leadId?: StringWithAggregatesFilter<"Reminder"> | string
    touchPointId?: StringNullableWithAggregatesFilter<"Reminder"> | string | null
    type?: EnumTouchPointTypeWithAggregatesFilter<"Reminder"> | $Enums.TouchPointType
    dueDate?: DateTimeWithAggregatesFilter<"Reminder"> | Date | string
    note?: StringNullableWithAggregatesFilter<"Reminder"> | string | null
    completed?: BoolWithAggregatesFilter<"Reminder"> | boolean
    completedAt?: DateTimeNullableWithAggregatesFilter<"Reminder"> | Date | string | null
    isCheckIn?: BoolWithAggregatesFilter<"Reminder"> | boolean
    isResponseCheck?: BoolWithAggregatesFilter<"Reminder"> | boolean
    isEmailSentCheck?: BoolWithAggregatesFilter<"Reminder"> | boolean
  }

  export type UserCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    email: string
    password: string
    role: $Enums.Role
    touchPoints?: TouchPointCreateNestedManyWithoutContactedByInput
    notes?: NoteCreateNestedManyWithoutAuthorInput
    assignedLeads?: LeadCreateNestedManyWithoutAssignedToInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    email: string
    password: string
    role: $Enums.Role
    touchPoints?: TouchPointUncheckedCreateNestedManyWithoutContactedByInput
    notes?: NoteUncheckedCreateNestedManyWithoutAuthorInput
    assignedLeads?: LeadUncheckedCreateNestedManyWithoutAssignedToInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    touchPoints?: TouchPointUpdateManyWithoutContactedByNestedInput
    notes?: NoteUpdateManyWithoutAuthorNestedInput
    assignedLeads?: LeadUpdateManyWithoutAssignedToNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    touchPoints?: TouchPointUncheckedUpdateManyWithoutContactedByNestedInput
    notes?: NoteUncheckedUpdateManyWithoutAuthorNestedInput
    assignedLeads?: LeadUncheckedUpdateManyWithoutAssignedToNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    email: string
    password: string
    role: $Enums.Role
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type LeadCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
    locations?: LocationCreateNestedManyWithoutBusinessInput
    primaryLocation?: LocationCreateNestedOneWithoutPrimaryForBusinessInput
    contacts?: ContactCreateNestedManyWithoutLeadInput
    industry: IndustryCreateNestedOneWithoutLeadsInput
    businessType: BusinessTypeCreateNestedOneWithoutLeadsInput
    touchPoint?: TouchPointCreateNestedManyWithoutLeadInput
    notes?: NoteCreateNestedManyWithoutLeadInput
    reminders?: ReminderCreateNestedManyWithoutLeadInput
    assignedTo?: UserCreateNestedOneWithoutAssignedLeadsInput
    referredByLead?: LeadCreateNestedOneWithoutReferralsInput
    referrals?: LeadCreateNestedManyWithoutReferredByLeadInput
  }

  export type LeadUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    primaryLocationId?: string | null
    industryId: string
    businessTypeId: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    assignedToId?: string | null
    referredByLeadId?: string | null
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
    locations?: LocationUncheckedCreateNestedManyWithoutBusinessInput
    contacts?: ContactUncheckedCreateNestedManyWithoutLeadInput
    touchPoint?: TouchPointUncheckedCreateNestedManyWithoutLeadInput
    notes?: NoteUncheckedCreateNestedManyWithoutLeadInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutLeadInput
    referrals?: LeadUncheckedCreateNestedManyWithoutReferredByLeadInput
  }

  export type LeadUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    locations?: LocationUpdateManyWithoutBusinessNestedInput
    primaryLocation?: LocationUpdateOneWithoutPrimaryForBusinessNestedInput
    contacts?: ContactUpdateManyWithoutLeadNestedInput
    industry?: IndustryUpdateOneRequiredWithoutLeadsNestedInput
    businessType?: BusinessTypeUpdateOneRequiredWithoutLeadsNestedInput
    touchPoint?: TouchPointUpdateManyWithoutLeadNestedInput
    notes?: NoteUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUpdateManyWithoutLeadNestedInput
    assignedTo?: UserUpdateOneWithoutAssignedLeadsNestedInput
    referredByLead?: LeadUpdateOneWithoutReferralsNestedInput
    referrals?: LeadUpdateManyWithoutReferredByLeadNestedInput
  }

  export type LeadUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    primaryLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    industryId?: StringFieldUpdateOperationsInput | string
    businessTypeId?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    locations?: LocationUncheckedUpdateManyWithoutBusinessNestedInput
    contacts?: ContactUncheckedUpdateManyWithoutLeadNestedInput
    touchPoint?: TouchPointUncheckedUpdateManyWithoutLeadNestedInput
    notes?: NoteUncheckedUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutLeadNestedInput
    referrals?: LeadUncheckedUpdateManyWithoutReferredByLeadNestedInput
  }

  export type LeadCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    primaryLocationId?: string | null
    industryId: string
    businessTypeId: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    assignedToId?: string | null
    referredByLeadId?: string | null
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
  }

  export type LeadUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type LeadUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    primaryLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    industryId?: StringFieldUpdateOperationsInput | string
    businessTypeId?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ContactCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    title?: string | null
    email?: string | null
    phone?: string | null
    isDecisionMaker?: boolean
    notes?: string | null
    lead: LeadCreateNestedOneWithoutContactsInput
  }

  export type ContactUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    title?: string | null
    email?: string | null
    phone?: string | null
    isDecisionMaker?: boolean
    notes?: string | null
    leadId: string
  }

  export type ContactUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isDecisionMaker?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    lead?: LeadUpdateOneRequiredWithoutContactsNestedInput
  }

  export type ContactUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isDecisionMaker?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    leadId?: StringFieldUpdateOperationsInput | string
  }

  export type ContactCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    title?: string | null
    email?: string | null
    phone?: string | null
    isDecisionMaker?: boolean
    notes?: string | null
    leadId: string
  }

  export type ContactUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isDecisionMaker?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ContactUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isDecisionMaker?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    leadId?: StringFieldUpdateOperationsInput | string
  }

  export type IndustryCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    leads?: LeadCreateNestedManyWithoutIndustryInput
  }

  export type IndustryUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    leads?: LeadUncheckedCreateNestedManyWithoutIndustryInput
  }

  export type IndustryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    leads?: LeadUpdateManyWithoutIndustryNestedInput
  }

  export type IndustryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    leads?: LeadUncheckedUpdateManyWithoutIndustryNestedInput
  }

  export type IndustryCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
  }

  export type IndustryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type IndustryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type BusinessTypeCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    leads?: LeadCreateNestedManyWithoutBusinessTypeInput
  }

  export type BusinessTypeUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    leads?: LeadUncheckedCreateNestedManyWithoutBusinessTypeInput
  }

  export type BusinessTypeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    leads?: LeadUpdateManyWithoutBusinessTypeNestedInput
  }

  export type BusinessTypeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    leads?: LeadUncheckedUpdateManyWithoutBusinessTypeNestedInput
  }

  export type BusinessTypeCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
  }

  export type BusinessTypeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type BusinessTypeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type LocationCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    addressLine1: string
    addressLine2?: string | null
    city: string
    state: string
    zip: string
    business: LeadCreateNestedOneWithoutLocationsInput
    phoneNumbers?: PhoneNumberCreateNestedManyWithoutLocationInput
    primaryForBusiness?: LeadCreateNestedOneWithoutPrimaryLocationInput
  }

  export type LocationUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    businessId: string
    addressLine1: string
    addressLine2?: string | null
    city: string
    state: string
    zip: string
    phoneNumbers?: PhoneNumberUncheckedCreateNestedManyWithoutLocationInput
    primaryForBusiness?: LeadUncheckedCreateNestedOneWithoutPrimaryLocationInput
  }

  export type LocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
    business?: LeadUpdateOneRequiredWithoutLocationsNestedInput
    phoneNumbers?: PhoneNumberUpdateManyWithoutLocationNestedInput
    primaryForBusiness?: LeadUpdateOneWithoutPrimaryLocationNestedInput
  }

  export type LocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    businessId?: StringFieldUpdateOperationsInput | string
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
    phoneNumbers?: PhoneNumberUncheckedUpdateManyWithoutLocationNestedInput
    primaryForBusiness?: LeadUncheckedUpdateOneWithoutPrimaryLocationNestedInput
  }

  export type LocationCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    businessId: string
    addressLine1: string
    addressLine2?: string | null
    city: string
    state: string
    zip: string
  }

  export type LocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
  }

  export type LocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    businessId?: StringFieldUpdateOperationsInput | string
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
  }

  export type PhoneNumberCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    number: string
    label?: $Enums.PhoneType | null
    location?: LocationCreateNestedOneWithoutPhoneNumbersInput
  }

  export type PhoneNumberUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    number: string
    label?: $Enums.PhoneType | null
    locationId?: string | null
  }

  export type PhoneNumberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    number?: StringFieldUpdateOperationsInput | string
    label?: NullableEnumPhoneTypeFieldUpdateOperationsInput | $Enums.PhoneType | null
    location?: LocationUpdateOneWithoutPhoneNumbersNestedInput
  }

  export type PhoneNumberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    number?: StringFieldUpdateOperationsInput | string
    label?: NullableEnumPhoneTypeFieldUpdateOperationsInput | $Enums.PhoneType | null
    locationId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PhoneNumberCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    number: string
    label?: $Enums.PhoneType | null
    locationId?: string | null
  }

  export type PhoneNumberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    number?: StringFieldUpdateOperationsInput | string
    label?: NullableEnumPhoneTypeFieldUpdateOperationsInput | $Enums.PhoneType | null
  }

  export type PhoneNumberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    number?: StringFieldUpdateOperationsInput | string
    label?: NullableEnumPhoneTypeFieldUpdateOperationsInput | $Enums.PhoneType | null
    locationId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NoteCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    text: string
    lead: LeadCreateNestedOneWithoutNotesInput
    author: UserCreateNestedOneWithoutNotesInput
  }

  export type NoteUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    text: string
    leadId: string
    userId: string
  }

  export type NoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    lead?: LeadUpdateOneRequiredWithoutNotesNestedInput
    author?: UserUpdateOneRequiredWithoutNotesNestedInput
  }

  export type NoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type NoteCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    text: string
    leadId: string
    userId: string
  }

  export type NoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
  }

  export type NoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TouchPointCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    date: Date | string
    type: $Enums.TouchPointType
    receivedResponse?: boolean
    summary?: string | null
    sequencePosition?: $Enums.SequencePosition | null
    lead: LeadCreateNestedOneWithoutTouchPointInput
    contactedBy: UserCreateNestedOneWithoutTouchPointsInput
    reminders?: ReminderCreateNestedManyWithoutTouchPointInput
  }

  export type TouchPointUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    date: Date | string
    type: $Enums.TouchPointType
    leadId: string
    contactedById: string
    receivedResponse?: boolean
    summary?: string | null
    sequencePosition?: $Enums.SequencePosition | null
    reminders?: ReminderUncheckedCreateNestedManyWithoutTouchPointInput
  }

  export type TouchPointUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTouchPointTypeFieldUpdateOperationsInput | $Enums.TouchPointType
    receivedResponse?: BoolFieldUpdateOperationsInput | boolean
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sequencePosition?: NullableEnumSequencePositionFieldUpdateOperationsInput | $Enums.SequencePosition | null
    lead?: LeadUpdateOneRequiredWithoutTouchPointNestedInput
    contactedBy?: UserUpdateOneRequiredWithoutTouchPointsNestedInput
    reminders?: ReminderUpdateManyWithoutTouchPointNestedInput
  }

  export type TouchPointUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTouchPointTypeFieldUpdateOperationsInput | $Enums.TouchPointType
    leadId?: StringFieldUpdateOperationsInput | string
    contactedById?: StringFieldUpdateOperationsInput | string
    receivedResponse?: BoolFieldUpdateOperationsInput | boolean
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sequencePosition?: NullableEnumSequencePositionFieldUpdateOperationsInput | $Enums.SequencePosition | null
    reminders?: ReminderUncheckedUpdateManyWithoutTouchPointNestedInput
  }

  export type TouchPointCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    date: Date | string
    type: $Enums.TouchPointType
    leadId: string
    contactedById: string
    receivedResponse?: boolean
    summary?: string | null
    sequencePosition?: $Enums.SequencePosition | null
  }

  export type TouchPointUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTouchPointTypeFieldUpdateOperationsInput | $Enums.TouchPointType
    receivedResponse?: BoolFieldUpdateOperationsInput | boolean
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sequencePosition?: NullableEnumSequencePositionFieldUpdateOperationsInput | $Enums.SequencePosition | null
  }

  export type TouchPointUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTouchPointTypeFieldUpdateOperationsInput | $Enums.TouchPointType
    leadId?: StringFieldUpdateOperationsInput | string
    contactedById?: StringFieldUpdateOperationsInput | string
    receivedResponse?: BoolFieldUpdateOperationsInput | boolean
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sequencePosition?: NullableEnumSequencePositionFieldUpdateOperationsInput | $Enums.SequencePosition | null
  }

  export type ReminderCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    type: $Enums.TouchPointType
    dueDate: Date | string
    note?: string | null
    completed?: boolean
    completedAt?: Date | string | null
    isCheckIn?: boolean
    isResponseCheck?: boolean
    isEmailSentCheck?: boolean
    lead: LeadCreateNestedOneWithoutRemindersInput
    touchPoint?: TouchPointCreateNestedOneWithoutRemindersInput
  }

  export type ReminderUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    leadId: string
    touchPointId?: string | null
    type: $Enums.TouchPointType
    dueDate: Date | string
    note?: string | null
    completed?: boolean
    completedAt?: Date | string | null
    isCheckIn?: boolean
    isResponseCheck?: boolean
    isEmailSentCheck?: boolean
  }

  export type ReminderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTouchPointTypeFieldUpdateOperationsInput | $Enums.TouchPointType
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCheckIn?: BoolFieldUpdateOperationsInput | boolean
    isResponseCheck?: BoolFieldUpdateOperationsInput | boolean
    isEmailSentCheck?: BoolFieldUpdateOperationsInput | boolean
    lead?: LeadUpdateOneRequiredWithoutRemindersNestedInput
    touchPoint?: TouchPointUpdateOneWithoutRemindersNestedInput
  }

  export type ReminderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leadId?: StringFieldUpdateOperationsInput | string
    touchPointId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTouchPointTypeFieldUpdateOperationsInput | $Enums.TouchPointType
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCheckIn?: BoolFieldUpdateOperationsInput | boolean
    isResponseCheck?: BoolFieldUpdateOperationsInput | boolean
    isEmailSentCheck?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ReminderCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    leadId: string
    touchPointId?: string | null
    type: $Enums.TouchPointType
    dueDate: Date | string
    note?: string | null
    completed?: boolean
    completedAt?: Date | string | null
    isCheckIn?: boolean
    isResponseCheck?: boolean
    isEmailSentCheck?: boolean
  }

  export type ReminderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTouchPointTypeFieldUpdateOperationsInput | $Enums.TouchPointType
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCheckIn?: BoolFieldUpdateOperationsInput | boolean
    isResponseCheck?: BoolFieldUpdateOperationsInput | boolean
    isEmailSentCheck?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ReminderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leadId?: StringFieldUpdateOperationsInput | string
    touchPointId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTouchPointTypeFieldUpdateOperationsInput | $Enums.TouchPointType
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCheckIn?: BoolFieldUpdateOperationsInput | boolean
    isResponseCheck?: BoolFieldUpdateOperationsInput | boolean
    isEmailSentCheck?: BoolFieldUpdateOperationsInput | boolean
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

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type TouchPointListRelationFilter = {
    every?: TouchPointWhereInput
    some?: TouchPointWhereInput
    none?: TouchPointWhereInput
  }

  export type NoteListRelationFilter = {
    every?: NoteWhereInput
    some?: NoteWhereInput
    none?: NoteWhereInput
  }

  export type LeadListRelationFilter = {
    every?: LeadWhereInput
    some?: LeadWhereInput
    none?: LeadWhereInput
  }

  export type TouchPointOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeadOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
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

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type EnumPipelineStageFilter<$PrismaModel = never> = {
    equals?: $Enums.PipelineStage | EnumPipelineStageFieldRefInput<$PrismaModel>
    in?: $Enums.PipelineStage[] | ListEnumPipelineStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.PipelineStage[] | ListEnumPipelineStageFieldRefInput<$PrismaModel>
    not?: NestedEnumPipelineStageFilter<$PrismaModel> | $Enums.PipelineStage
  }

  export type EnumLeadSourceNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadSource | EnumLeadSourceFieldRefInput<$PrismaModel> | null
    in?: $Enums.LeadSource[] | ListEnumLeadSourceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.LeadSource[] | ListEnumLeadSourceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumLeadSourceNullableFilter<$PrismaModel> | $Enums.LeadSource | null
  }

  export type EnumDiscoveredViaNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.DiscoveredVia | EnumDiscoveredViaFieldRefInput<$PrismaModel> | null
    in?: $Enums.DiscoveredVia[] | ListEnumDiscoveredViaFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DiscoveredVia[] | ListEnumDiscoveredViaFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDiscoveredViaNullableFilter<$PrismaModel> | $Enums.DiscoveredVia | null
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumPriorityNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel> | null
    in?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPriorityNullableFilter<$PrismaModel> | $Enums.Priority | null
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

  export type LocationListRelationFilter = {
    every?: LocationWhereInput
    some?: LocationWhereInput
    none?: LocationWhereInput
  }

  export type LocationNullableScalarRelationFilter = {
    is?: LocationWhereInput | null
    isNot?: LocationWhereInput | null
  }

  export type ContactListRelationFilter = {
    every?: ContactWhereInput
    some?: ContactWhereInput
    none?: ContactWhereInput
  }

  export type IndustryScalarRelationFilter = {
    is?: IndustryWhereInput
    isNot?: IndustryWhereInput
  }

  export type BusinessTypeScalarRelationFilter = {
    is?: BusinessTypeWhereInput
    isNot?: BusinessTypeWhereInput
  }

  export type ReminderListRelationFilter = {
    every?: ReminderWhereInput
    some?: ReminderWhereInput
    none?: ReminderWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type LeadNullableScalarRelationFilter = {
    is?: LeadWhereInput | null
    isNot?: LeadWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type LocationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContactOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReminderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeadCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    business?: SortOrder
    primaryLocationId?: SortOrder
    industryId?: SortOrder
    businessTypeId?: SortOrder
    igHandle?: SortOrder
    igFollowerCount?: SortOrder
    email?: SortOrder
    website?: SortOrder
    pipelineStage?: SortOrder
    source?: SortOrder
    discoveredVia?: SortOrder
    discoveredViaOther?: SortOrder
    convertedAt?: SortOrder
    isBlackOwned?: SortOrder
    isWomanOwned?: SortOrder
    isLatinoOwned?: SortOrder
    isImmigrantOwned?: SortOrder
    priority?: SortOrder
    sequenceStep?: SortOrder
    sequenceActive?: SortOrder
    isHot?: SortOrder
    assignedToId?: SortOrder
    referredByLeadId?: SortOrder
    referredByName?: SortOrder
    instagramHandle?: SortOrder
    instagramFollowers?: SortOrder
    tiktokHandle?: SortOrder
    tiktokFollowers?: SortOrder
    youtubeHandle?: SortOrder
    youtubeFollowers?: SortOrder
    facebookHandle?: SortOrder
    facebookFollowers?: SortOrder
  }

  export type LeadAvgOrderByAggregateInput = {
    igFollowerCount?: SortOrder
    sequenceStep?: SortOrder
    instagramFollowers?: SortOrder
    tiktokFollowers?: SortOrder
    youtubeFollowers?: SortOrder
    facebookFollowers?: SortOrder
  }

  export type LeadMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    business?: SortOrder
    primaryLocationId?: SortOrder
    industryId?: SortOrder
    businessTypeId?: SortOrder
    igHandle?: SortOrder
    igFollowerCount?: SortOrder
    email?: SortOrder
    website?: SortOrder
    pipelineStage?: SortOrder
    source?: SortOrder
    discoveredVia?: SortOrder
    discoveredViaOther?: SortOrder
    convertedAt?: SortOrder
    isBlackOwned?: SortOrder
    isWomanOwned?: SortOrder
    isLatinoOwned?: SortOrder
    isImmigrantOwned?: SortOrder
    priority?: SortOrder
    sequenceStep?: SortOrder
    sequenceActive?: SortOrder
    isHot?: SortOrder
    assignedToId?: SortOrder
    referredByLeadId?: SortOrder
    referredByName?: SortOrder
    instagramHandle?: SortOrder
    instagramFollowers?: SortOrder
    tiktokHandle?: SortOrder
    tiktokFollowers?: SortOrder
    youtubeHandle?: SortOrder
    youtubeFollowers?: SortOrder
    facebookHandle?: SortOrder
    facebookFollowers?: SortOrder
  }

  export type LeadMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    business?: SortOrder
    primaryLocationId?: SortOrder
    industryId?: SortOrder
    businessTypeId?: SortOrder
    igHandle?: SortOrder
    igFollowerCount?: SortOrder
    email?: SortOrder
    website?: SortOrder
    pipelineStage?: SortOrder
    source?: SortOrder
    discoveredVia?: SortOrder
    discoveredViaOther?: SortOrder
    convertedAt?: SortOrder
    isBlackOwned?: SortOrder
    isWomanOwned?: SortOrder
    isLatinoOwned?: SortOrder
    isImmigrantOwned?: SortOrder
    priority?: SortOrder
    sequenceStep?: SortOrder
    sequenceActive?: SortOrder
    isHot?: SortOrder
    assignedToId?: SortOrder
    referredByLeadId?: SortOrder
    referredByName?: SortOrder
    instagramHandle?: SortOrder
    instagramFollowers?: SortOrder
    tiktokHandle?: SortOrder
    tiktokFollowers?: SortOrder
    youtubeHandle?: SortOrder
    youtubeFollowers?: SortOrder
    facebookHandle?: SortOrder
    facebookFollowers?: SortOrder
  }

  export type LeadSumOrderByAggregateInput = {
    igFollowerCount?: SortOrder
    sequenceStep?: SortOrder
    instagramFollowers?: SortOrder
    tiktokFollowers?: SortOrder
    youtubeFollowers?: SortOrder
    facebookFollowers?: SortOrder
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

  export type EnumPipelineStageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PipelineStage | EnumPipelineStageFieldRefInput<$PrismaModel>
    in?: $Enums.PipelineStage[] | ListEnumPipelineStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.PipelineStage[] | ListEnumPipelineStageFieldRefInput<$PrismaModel>
    not?: NestedEnumPipelineStageWithAggregatesFilter<$PrismaModel> | $Enums.PipelineStage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPipelineStageFilter<$PrismaModel>
    _max?: NestedEnumPipelineStageFilter<$PrismaModel>
  }

  export type EnumLeadSourceNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadSource | EnumLeadSourceFieldRefInput<$PrismaModel> | null
    in?: $Enums.LeadSource[] | ListEnumLeadSourceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.LeadSource[] | ListEnumLeadSourceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumLeadSourceNullableWithAggregatesFilter<$PrismaModel> | $Enums.LeadSource | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumLeadSourceNullableFilter<$PrismaModel>
    _max?: NestedEnumLeadSourceNullableFilter<$PrismaModel>
  }

  export type EnumDiscoveredViaNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DiscoveredVia | EnumDiscoveredViaFieldRefInput<$PrismaModel> | null
    in?: $Enums.DiscoveredVia[] | ListEnumDiscoveredViaFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DiscoveredVia[] | ListEnumDiscoveredViaFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDiscoveredViaNullableWithAggregatesFilter<$PrismaModel> | $Enums.DiscoveredVia | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumDiscoveredViaNullableFilter<$PrismaModel>
    _max?: NestedEnumDiscoveredViaNullableFilter<$PrismaModel>
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumPriorityNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel> | null
    in?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPriorityNullableWithAggregatesFilter<$PrismaModel> | $Enums.Priority | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumPriorityNullableFilter<$PrismaModel>
    _max?: NestedEnumPriorityNullableFilter<$PrismaModel>
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

  export type LeadScalarRelationFilter = {
    is?: LeadWhereInput
    isNot?: LeadWhereInput
  }

  export type ContactCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    title?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    isDecisionMaker?: SortOrder
    notes?: SortOrder
    leadId?: SortOrder
  }

  export type ContactMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    title?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    isDecisionMaker?: SortOrder
    notes?: SortOrder
    leadId?: SortOrder
  }

  export type ContactMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    title?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    isDecisionMaker?: SortOrder
    notes?: SortOrder
    leadId?: SortOrder
  }

  export type IndustryCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
  }

  export type IndustryMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
  }

  export type IndustryMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
  }

  export type BusinessTypeCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
  }

  export type BusinessTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
  }

  export type BusinessTypeMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
  }

  export type PhoneNumberListRelationFilter = {
    every?: PhoneNumberWhereInput
    some?: PhoneNumberWhereInput
    none?: PhoneNumberWhereInput
  }

  export type PhoneNumberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LocationCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    businessId?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zip?: SortOrder
  }

  export type LocationMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    businessId?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zip?: SortOrder
  }

  export type LocationMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    businessId?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zip?: SortOrder
  }

  export type EnumPhoneTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.PhoneType | EnumPhoneTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.PhoneType[] | ListEnumPhoneTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PhoneType[] | ListEnumPhoneTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPhoneTypeNullableFilter<$PrismaModel> | $Enums.PhoneType | null
  }

  export type PhoneNumberCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    number?: SortOrder
    label?: SortOrder
    locationId?: SortOrder
  }

  export type PhoneNumberMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    number?: SortOrder
    label?: SortOrder
    locationId?: SortOrder
  }

  export type PhoneNumberMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    number?: SortOrder
    label?: SortOrder
    locationId?: SortOrder
  }

  export type EnumPhoneTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PhoneType | EnumPhoneTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.PhoneType[] | ListEnumPhoneTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PhoneType[] | ListEnumPhoneTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPhoneTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.PhoneType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumPhoneTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumPhoneTypeNullableFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type NoteCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    text?: SortOrder
    leadId?: SortOrder
    userId?: SortOrder
  }

  export type NoteMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    text?: SortOrder
    leadId?: SortOrder
    userId?: SortOrder
  }

  export type NoteMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    text?: SortOrder
    leadId?: SortOrder
    userId?: SortOrder
  }

  export type EnumTouchPointTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TouchPointType | EnumTouchPointTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TouchPointType[] | ListEnumTouchPointTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TouchPointType[] | ListEnumTouchPointTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTouchPointTypeFilter<$PrismaModel> | $Enums.TouchPointType
  }

  export type EnumSequencePositionNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.SequencePosition | EnumSequencePositionFieldRefInput<$PrismaModel> | null
    in?: $Enums.SequencePosition[] | ListEnumSequencePositionFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.SequencePosition[] | ListEnumSequencePositionFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSequencePositionNullableFilter<$PrismaModel> | $Enums.SequencePosition | null
  }

  export type TouchPointCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    date?: SortOrder
    type?: SortOrder
    leadId?: SortOrder
    contactedById?: SortOrder
    receivedResponse?: SortOrder
    summary?: SortOrder
    sequencePosition?: SortOrder
  }

  export type TouchPointMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    date?: SortOrder
    type?: SortOrder
    leadId?: SortOrder
    contactedById?: SortOrder
    receivedResponse?: SortOrder
    summary?: SortOrder
    sequencePosition?: SortOrder
  }

  export type TouchPointMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    date?: SortOrder
    type?: SortOrder
    leadId?: SortOrder
    contactedById?: SortOrder
    receivedResponse?: SortOrder
    summary?: SortOrder
    sequencePosition?: SortOrder
  }

  export type EnumTouchPointTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TouchPointType | EnumTouchPointTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TouchPointType[] | ListEnumTouchPointTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TouchPointType[] | ListEnumTouchPointTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTouchPointTypeWithAggregatesFilter<$PrismaModel> | $Enums.TouchPointType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTouchPointTypeFilter<$PrismaModel>
    _max?: NestedEnumTouchPointTypeFilter<$PrismaModel>
  }

  export type EnumSequencePositionNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SequencePosition | EnumSequencePositionFieldRefInput<$PrismaModel> | null
    in?: $Enums.SequencePosition[] | ListEnumSequencePositionFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.SequencePosition[] | ListEnumSequencePositionFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSequencePositionNullableWithAggregatesFilter<$PrismaModel> | $Enums.SequencePosition | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumSequencePositionNullableFilter<$PrismaModel>
    _max?: NestedEnumSequencePositionNullableFilter<$PrismaModel>
  }

  export type TouchPointNullableScalarRelationFilter = {
    is?: TouchPointWhereInput | null
    isNot?: TouchPointWhereInput | null
  }

  export type ReminderCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    leadId?: SortOrder
    touchPointId?: SortOrder
    type?: SortOrder
    dueDate?: SortOrder
    note?: SortOrder
    completed?: SortOrder
    completedAt?: SortOrder
    isCheckIn?: SortOrder
    isResponseCheck?: SortOrder
    isEmailSentCheck?: SortOrder
  }

  export type ReminderMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    leadId?: SortOrder
    touchPointId?: SortOrder
    type?: SortOrder
    dueDate?: SortOrder
    note?: SortOrder
    completed?: SortOrder
    completedAt?: SortOrder
    isCheckIn?: SortOrder
    isResponseCheck?: SortOrder
    isEmailSentCheck?: SortOrder
  }

  export type ReminderMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    leadId?: SortOrder
    touchPointId?: SortOrder
    type?: SortOrder
    dueDate?: SortOrder
    note?: SortOrder
    completed?: SortOrder
    completedAt?: SortOrder
    isCheckIn?: SortOrder
    isResponseCheck?: SortOrder
    isEmailSentCheck?: SortOrder
  }

  export type TouchPointCreateNestedManyWithoutContactedByInput = {
    create?: XOR<TouchPointCreateWithoutContactedByInput, TouchPointUncheckedCreateWithoutContactedByInput> | TouchPointCreateWithoutContactedByInput[] | TouchPointUncheckedCreateWithoutContactedByInput[]
    connectOrCreate?: TouchPointCreateOrConnectWithoutContactedByInput | TouchPointCreateOrConnectWithoutContactedByInput[]
    createMany?: TouchPointCreateManyContactedByInputEnvelope
    connect?: TouchPointWhereUniqueInput | TouchPointWhereUniqueInput[]
  }

  export type NoteCreateNestedManyWithoutAuthorInput = {
    create?: XOR<NoteCreateWithoutAuthorInput, NoteUncheckedCreateWithoutAuthorInput> | NoteCreateWithoutAuthorInput[] | NoteUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutAuthorInput | NoteCreateOrConnectWithoutAuthorInput[]
    createMany?: NoteCreateManyAuthorInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type LeadCreateNestedManyWithoutAssignedToInput = {
    create?: XOR<LeadCreateWithoutAssignedToInput, LeadUncheckedCreateWithoutAssignedToInput> | LeadCreateWithoutAssignedToInput[] | LeadUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutAssignedToInput | LeadCreateOrConnectWithoutAssignedToInput[]
    createMany?: LeadCreateManyAssignedToInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type TouchPointUncheckedCreateNestedManyWithoutContactedByInput = {
    create?: XOR<TouchPointCreateWithoutContactedByInput, TouchPointUncheckedCreateWithoutContactedByInput> | TouchPointCreateWithoutContactedByInput[] | TouchPointUncheckedCreateWithoutContactedByInput[]
    connectOrCreate?: TouchPointCreateOrConnectWithoutContactedByInput | TouchPointCreateOrConnectWithoutContactedByInput[]
    createMany?: TouchPointCreateManyContactedByInputEnvelope
    connect?: TouchPointWhereUniqueInput | TouchPointWhereUniqueInput[]
  }

  export type NoteUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<NoteCreateWithoutAuthorInput, NoteUncheckedCreateWithoutAuthorInput> | NoteCreateWithoutAuthorInput[] | NoteUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutAuthorInput | NoteCreateOrConnectWithoutAuthorInput[]
    createMany?: NoteCreateManyAuthorInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type LeadUncheckedCreateNestedManyWithoutAssignedToInput = {
    create?: XOR<LeadCreateWithoutAssignedToInput, LeadUncheckedCreateWithoutAssignedToInput> | LeadCreateWithoutAssignedToInput[] | LeadUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutAssignedToInput | LeadCreateOrConnectWithoutAssignedToInput[]
    createMany?: LeadCreateManyAssignedToInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type TouchPointUpdateManyWithoutContactedByNestedInput = {
    create?: XOR<TouchPointCreateWithoutContactedByInput, TouchPointUncheckedCreateWithoutContactedByInput> | TouchPointCreateWithoutContactedByInput[] | TouchPointUncheckedCreateWithoutContactedByInput[]
    connectOrCreate?: TouchPointCreateOrConnectWithoutContactedByInput | TouchPointCreateOrConnectWithoutContactedByInput[]
    upsert?: TouchPointUpsertWithWhereUniqueWithoutContactedByInput | TouchPointUpsertWithWhereUniqueWithoutContactedByInput[]
    createMany?: TouchPointCreateManyContactedByInputEnvelope
    set?: TouchPointWhereUniqueInput | TouchPointWhereUniqueInput[]
    disconnect?: TouchPointWhereUniqueInput | TouchPointWhereUniqueInput[]
    delete?: TouchPointWhereUniqueInput | TouchPointWhereUniqueInput[]
    connect?: TouchPointWhereUniqueInput | TouchPointWhereUniqueInput[]
    update?: TouchPointUpdateWithWhereUniqueWithoutContactedByInput | TouchPointUpdateWithWhereUniqueWithoutContactedByInput[]
    updateMany?: TouchPointUpdateManyWithWhereWithoutContactedByInput | TouchPointUpdateManyWithWhereWithoutContactedByInput[]
    deleteMany?: TouchPointScalarWhereInput | TouchPointScalarWhereInput[]
  }

  export type NoteUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<NoteCreateWithoutAuthorInput, NoteUncheckedCreateWithoutAuthorInput> | NoteCreateWithoutAuthorInput[] | NoteUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutAuthorInput | NoteCreateOrConnectWithoutAuthorInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutAuthorInput | NoteUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: NoteCreateManyAuthorInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutAuthorInput | NoteUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutAuthorInput | NoteUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type LeadUpdateManyWithoutAssignedToNestedInput = {
    create?: XOR<LeadCreateWithoutAssignedToInput, LeadUncheckedCreateWithoutAssignedToInput> | LeadCreateWithoutAssignedToInput[] | LeadUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutAssignedToInput | LeadCreateOrConnectWithoutAssignedToInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutAssignedToInput | LeadUpsertWithWhereUniqueWithoutAssignedToInput[]
    createMany?: LeadCreateManyAssignedToInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutAssignedToInput | LeadUpdateWithWhereUniqueWithoutAssignedToInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutAssignedToInput | LeadUpdateManyWithWhereWithoutAssignedToInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type TouchPointUncheckedUpdateManyWithoutContactedByNestedInput = {
    create?: XOR<TouchPointCreateWithoutContactedByInput, TouchPointUncheckedCreateWithoutContactedByInput> | TouchPointCreateWithoutContactedByInput[] | TouchPointUncheckedCreateWithoutContactedByInput[]
    connectOrCreate?: TouchPointCreateOrConnectWithoutContactedByInput | TouchPointCreateOrConnectWithoutContactedByInput[]
    upsert?: TouchPointUpsertWithWhereUniqueWithoutContactedByInput | TouchPointUpsertWithWhereUniqueWithoutContactedByInput[]
    createMany?: TouchPointCreateManyContactedByInputEnvelope
    set?: TouchPointWhereUniqueInput | TouchPointWhereUniqueInput[]
    disconnect?: TouchPointWhereUniqueInput | TouchPointWhereUniqueInput[]
    delete?: TouchPointWhereUniqueInput | TouchPointWhereUniqueInput[]
    connect?: TouchPointWhereUniqueInput | TouchPointWhereUniqueInput[]
    update?: TouchPointUpdateWithWhereUniqueWithoutContactedByInput | TouchPointUpdateWithWhereUniqueWithoutContactedByInput[]
    updateMany?: TouchPointUpdateManyWithWhereWithoutContactedByInput | TouchPointUpdateManyWithWhereWithoutContactedByInput[]
    deleteMany?: TouchPointScalarWhereInput | TouchPointScalarWhereInput[]
  }

  export type NoteUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<NoteCreateWithoutAuthorInput, NoteUncheckedCreateWithoutAuthorInput> | NoteCreateWithoutAuthorInput[] | NoteUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutAuthorInput | NoteCreateOrConnectWithoutAuthorInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutAuthorInput | NoteUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: NoteCreateManyAuthorInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutAuthorInput | NoteUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutAuthorInput | NoteUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type LeadUncheckedUpdateManyWithoutAssignedToNestedInput = {
    create?: XOR<LeadCreateWithoutAssignedToInput, LeadUncheckedCreateWithoutAssignedToInput> | LeadCreateWithoutAssignedToInput[] | LeadUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutAssignedToInput | LeadCreateOrConnectWithoutAssignedToInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutAssignedToInput | LeadUpsertWithWhereUniqueWithoutAssignedToInput[]
    createMany?: LeadCreateManyAssignedToInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutAssignedToInput | LeadUpdateWithWhereUniqueWithoutAssignedToInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutAssignedToInput | LeadUpdateManyWithWhereWithoutAssignedToInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type LocationCreateNestedManyWithoutBusinessInput = {
    create?: XOR<LocationCreateWithoutBusinessInput, LocationUncheckedCreateWithoutBusinessInput> | LocationCreateWithoutBusinessInput[] | LocationUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutBusinessInput | LocationCreateOrConnectWithoutBusinessInput[]
    createMany?: LocationCreateManyBusinessInputEnvelope
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
  }

  export type LocationCreateNestedOneWithoutPrimaryForBusinessInput = {
    create?: XOR<LocationCreateWithoutPrimaryForBusinessInput, LocationUncheckedCreateWithoutPrimaryForBusinessInput>
    connectOrCreate?: LocationCreateOrConnectWithoutPrimaryForBusinessInput
    connect?: LocationWhereUniqueInput
  }

  export type ContactCreateNestedManyWithoutLeadInput = {
    create?: XOR<ContactCreateWithoutLeadInput, ContactUncheckedCreateWithoutLeadInput> | ContactCreateWithoutLeadInput[] | ContactUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutLeadInput | ContactCreateOrConnectWithoutLeadInput[]
    createMany?: ContactCreateManyLeadInputEnvelope
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
  }

  export type IndustryCreateNestedOneWithoutLeadsInput = {
    create?: XOR<IndustryCreateWithoutLeadsInput, IndustryUncheckedCreateWithoutLeadsInput>
    connectOrCreate?: IndustryCreateOrConnectWithoutLeadsInput
    connect?: IndustryWhereUniqueInput
  }

  export type BusinessTypeCreateNestedOneWithoutLeadsInput = {
    create?: XOR<BusinessTypeCreateWithoutLeadsInput, BusinessTypeUncheckedCreateWithoutLeadsInput>
    connectOrCreate?: BusinessTypeCreateOrConnectWithoutLeadsInput
    connect?: BusinessTypeWhereUniqueInput
  }

  export type TouchPointCreateNestedManyWithoutLeadInput = {
    create?: XOR<TouchPointCreateWithoutLeadInput, TouchPointUncheckedCreateWithoutLeadInput> | TouchPointCreateWithoutLeadInput[] | TouchPointUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: TouchPointCreateOrConnectWithoutLeadInput | TouchPointCreateOrConnectWithoutLeadInput[]
    createMany?: TouchPointCreateManyLeadInputEnvelope
    connect?: TouchPointWhereUniqueInput | TouchPointWhereUniqueInput[]
  }

  export type NoteCreateNestedManyWithoutLeadInput = {
    create?: XOR<NoteCreateWithoutLeadInput, NoteUncheckedCreateWithoutLeadInput> | NoteCreateWithoutLeadInput[] | NoteUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutLeadInput | NoteCreateOrConnectWithoutLeadInput[]
    createMany?: NoteCreateManyLeadInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type ReminderCreateNestedManyWithoutLeadInput = {
    create?: XOR<ReminderCreateWithoutLeadInput, ReminderUncheckedCreateWithoutLeadInput> | ReminderCreateWithoutLeadInput[] | ReminderUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutLeadInput | ReminderCreateOrConnectWithoutLeadInput[]
    createMany?: ReminderCreateManyLeadInputEnvelope
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutAssignedLeadsInput = {
    create?: XOR<UserCreateWithoutAssignedLeadsInput, UserUncheckedCreateWithoutAssignedLeadsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedLeadsInput
    connect?: UserWhereUniqueInput
  }

  export type LeadCreateNestedOneWithoutReferralsInput = {
    create?: XOR<LeadCreateWithoutReferralsInput, LeadUncheckedCreateWithoutReferralsInput>
    connectOrCreate?: LeadCreateOrConnectWithoutReferralsInput
    connect?: LeadWhereUniqueInput
  }

  export type LeadCreateNestedManyWithoutReferredByLeadInput = {
    create?: XOR<LeadCreateWithoutReferredByLeadInput, LeadUncheckedCreateWithoutReferredByLeadInput> | LeadCreateWithoutReferredByLeadInput[] | LeadUncheckedCreateWithoutReferredByLeadInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutReferredByLeadInput | LeadCreateOrConnectWithoutReferredByLeadInput[]
    createMany?: LeadCreateManyReferredByLeadInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type LocationUncheckedCreateNestedManyWithoutBusinessInput = {
    create?: XOR<LocationCreateWithoutBusinessInput, LocationUncheckedCreateWithoutBusinessInput> | LocationCreateWithoutBusinessInput[] | LocationUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutBusinessInput | LocationCreateOrConnectWithoutBusinessInput[]
    createMany?: LocationCreateManyBusinessInputEnvelope
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
  }

  export type ContactUncheckedCreateNestedManyWithoutLeadInput = {
    create?: XOR<ContactCreateWithoutLeadInput, ContactUncheckedCreateWithoutLeadInput> | ContactCreateWithoutLeadInput[] | ContactUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutLeadInput | ContactCreateOrConnectWithoutLeadInput[]
    createMany?: ContactCreateManyLeadInputEnvelope
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
  }

  export type TouchPointUncheckedCreateNestedManyWithoutLeadInput = {
    create?: XOR<TouchPointCreateWithoutLeadInput, TouchPointUncheckedCreateWithoutLeadInput> | TouchPointCreateWithoutLeadInput[] | TouchPointUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: TouchPointCreateOrConnectWithoutLeadInput | TouchPointCreateOrConnectWithoutLeadInput[]
    createMany?: TouchPointCreateManyLeadInputEnvelope
    connect?: TouchPointWhereUniqueInput | TouchPointWhereUniqueInput[]
  }

  export type NoteUncheckedCreateNestedManyWithoutLeadInput = {
    create?: XOR<NoteCreateWithoutLeadInput, NoteUncheckedCreateWithoutLeadInput> | NoteCreateWithoutLeadInput[] | NoteUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutLeadInput | NoteCreateOrConnectWithoutLeadInput[]
    createMany?: NoteCreateManyLeadInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type ReminderUncheckedCreateNestedManyWithoutLeadInput = {
    create?: XOR<ReminderCreateWithoutLeadInput, ReminderUncheckedCreateWithoutLeadInput> | ReminderCreateWithoutLeadInput[] | ReminderUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutLeadInput | ReminderCreateOrConnectWithoutLeadInput[]
    createMany?: ReminderCreateManyLeadInputEnvelope
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
  }

  export type LeadUncheckedCreateNestedManyWithoutReferredByLeadInput = {
    create?: XOR<LeadCreateWithoutReferredByLeadInput, LeadUncheckedCreateWithoutReferredByLeadInput> | LeadCreateWithoutReferredByLeadInput[] | LeadUncheckedCreateWithoutReferredByLeadInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutReferredByLeadInput | LeadCreateOrConnectWithoutReferredByLeadInput[]
    createMany?: LeadCreateManyReferredByLeadInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumPipelineStageFieldUpdateOperationsInput = {
    set?: $Enums.PipelineStage
  }

  export type NullableEnumLeadSourceFieldUpdateOperationsInput = {
    set?: $Enums.LeadSource | null
  }

  export type NullableEnumDiscoveredViaFieldUpdateOperationsInput = {
    set?: $Enums.DiscoveredVia | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableEnumPriorityFieldUpdateOperationsInput = {
    set?: $Enums.Priority | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LocationUpdateManyWithoutBusinessNestedInput = {
    create?: XOR<LocationCreateWithoutBusinessInput, LocationUncheckedCreateWithoutBusinessInput> | LocationCreateWithoutBusinessInput[] | LocationUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutBusinessInput | LocationCreateOrConnectWithoutBusinessInput[]
    upsert?: LocationUpsertWithWhereUniqueWithoutBusinessInput | LocationUpsertWithWhereUniqueWithoutBusinessInput[]
    createMany?: LocationCreateManyBusinessInputEnvelope
    set?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    disconnect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    delete?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    update?: LocationUpdateWithWhereUniqueWithoutBusinessInput | LocationUpdateWithWhereUniqueWithoutBusinessInput[]
    updateMany?: LocationUpdateManyWithWhereWithoutBusinessInput | LocationUpdateManyWithWhereWithoutBusinessInput[]
    deleteMany?: LocationScalarWhereInput | LocationScalarWhereInput[]
  }

  export type LocationUpdateOneWithoutPrimaryForBusinessNestedInput = {
    create?: XOR<LocationCreateWithoutPrimaryForBusinessInput, LocationUncheckedCreateWithoutPrimaryForBusinessInput>
    connectOrCreate?: LocationCreateOrConnectWithoutPrimaryForBusinessInput
    upsert?: LocationUpsertWithoutPrimaryForBusinessInput
    disconnect?: LocationWhereInput | boolean
    delete?: LocationWhereInput | boolean
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutPrimaryForBusinessInput, LocationUpdateWithoutPrimaryForBusinessInput>, LocationUncheckedUpdateWithoutPrimaryForBusinessInput>
  }

  export type ContactUpdateManyWithoutLeadNestedInput = {
    create?: XOR<ContactCreateWithoutLeadInput, ContactUncheckedCreateWithoutLeadInput> | ContactCreateWithoutLeadInput[] | ContactUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutLeadInput | ContactCreateOrConnectWithoutLeadInput[]
    upsert?: ContactUpsertWithWhereUniqueWithoutLeadInput | ContactUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: ContactCreateManyLeadInputEnvelope
    set?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    disconnect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    delete?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    update?: ContactUpdateWithWhereUniqueWithoutLeadInput | ContactUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: ContactUpdateManyWithWhereWithoutLeadInput | ContactUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: ContactScalarWhereInput | ContactScalarWhereInput[]
  }

  export type IndustryUpdateOneRequiredWithoutLeadsNestedInput = {
    create?: XOR<IndustryCreateWithoutLeadsInput, IndustryUncheckedCreateWithoutLeadsInput>
    connectOrCreate?: IndustryCreateOrConnectWithoutLeadsInput
    upsert?: IndustryUpsertWithoutLeadsInput
    connect?: IndustryWhereUniqueInput
    update?: XOR<XOR<IndustryUpdateToOneWithWhereWithoutLeadsInput, IndustryUpdateWithoutLeadsInput>, IndustryUncheckedUpdateWithoutLeadsInput>
  }

  export type BusinessTypeUpdateOneRequiredWithoutLeadsNestedInput = {
    create?: XOR<BusinessTypeCreateWithoutLeadsInput, BusinessTypeUncheckedCreateWithoutLeadsInput>
    connectOrCreate?: BusinessTypeCreateOrConnectWithoutLeadsInput
    upsert?: BusinessTypeUpsertWithoutLeadsInput
    connect?: BusinessTypeWhereUniqueInput
    update?: XOR<XOR<BusinessTypeUpdateToOneWithWhereWithoutLeadsInput, BusinessTypeUpdateWithoutLeadsInput>, BusinessTypeUncheckedUpdateWithoutLeadsInput>
  }

  export type TouchPointUpdateManyWithoutLeadNestedInput = {
    create?: XOR<TouchPointCreateWithoutLeadInput, TouchPointUncheckedCreateWithoutLeadInput> | TouchPointCreateWithoutLeadInput[] | TouchPointUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: TouchPointCreateOrConnectWithoutLeadInput | TouchPointCreateOrConnectWithoutLeadInput[]
    upsert?: TouchPointUpsertWithWhereUniqueWithoutLeadInput | TouchPointUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: TouchPointCreateManyLeadInputEnvelope
    set?: TouchPointWhereUniqueInput | TouchPointWhereUniqueInput[]
    disconnect?: TouchPointWhereUniqueInput | TouchPointWhereUniqueInput[]
    delete?: TouchPointWhereUniqueInput | TouchPointWhereUniqueInput[]
    connect?: TouchPointWhereUniqueInput | TouchPointWhereUniqueInput[]
    update?: TouchPointUpdateWithWhereUniqueWithoutLeadInput | TouchPointUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: TouchPointUpdateManyWithWhereWithoutLeadInput | TouchPointUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: TouchPointScalarWhereInput | TouchPointScalarWhereInput[]
  }

  export type NoteUpdateManyWithoutLeadNestedInput = {
    create?: XOR<NoteCreateWithoutLeadInput, NoteUncheckedCreateWithoutLeadInput> | NoteCreateWithoutLeadInput[] | NoteUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutLeadInput | NoteCreateOrConnectWithoutLeadInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutLeadInput | NoteUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: NoteCreateManyLeadInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutLeadInput | NoteUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutLeadInput | NoteUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type ReminderUpdateManyWithoutLeadNestedInput = {
    create?: XOR<ReminderCreateWithoutLeadInput, ReminderUncheckedCreateWithoutLeadInput> | ReminderCreateWithoutLeadInput[] | ReminderUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutLeadInput | ReminderCreateOrConnectWithoutLeadInput[]
    upsert?: ReminderUpsertWithWhereUniqueWithoutLeadInput | ReminderUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: ReminderCreateManyLeadInputEnvelope
    set?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    disconnect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    delete?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    update?: ReminderUpdateWithWhereUniqueWithoutLeadInput | ReminderUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: ReminderUpdateManyWithWhereWithoutLeadInput | ReminderUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
  }

  export type UserUpdateOneWithoutAssignedLeadsNestedInput = {
    create?: XOR<UserCreateWithoutAssignedLeadsInput, UserUncheckedCreateWithoutAssignedLeadsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedLeadsInput
    upsert?: UserUpsertWithoutAssignedLeadsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAssignedLeadsInput, UserUpdateWithoutAssignedLeadsInput>, UserUncheckedUpdateWithoutAssignedLeadsInput>
  }

  export type LeadUpdateOneWithoutReferralsNestedInput = {
    create?: XOR<LeadCreateWithoutReferralsInput, LeadUncheckedCreateWithoutReferralsInput>
    connectOrCreate?: LeadCreateOrConnectWithoutReferralsInput
    upsert?: LeadUpsertWithoutReferralsInput
    disconnect?: LeadWhereInput | boolean
    delete?: LeadWhereInput | boolean
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutReferralsInput, LeadUpdateWithoutReferralsInput>, LeadUncheckedUpdateWithoutReferralsInput>
  }

  export type LeadUpdateManyWithoutReferredByLeadNestedInput = {
    create?: XOR<LeadCreateWithoutReferredByLeadInput, LeadUncheckedCreateWithoutReferredByLeadInput> | LeadCreateWithoutReferredByLeadInput[] | LeadUncheckedCreateWithoutReferredByLeadInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutReferredByLeadInput | LeadCreateOrConnectWithoutReferredByLeadInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutReferredByLeadInput | LeadUpsertWithWhereUniqueWithoutReferredByLeadInput[]
    createMany?: LeadCreateManyReferredByLeadInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutReferredByLeadInput | LeadUpdateWithWhereUniqueWithoutReferredByLeadInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutReferredByLeadInput | LeadUpdateManyWithWhereWithoutReferredByLeadInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type LocationUncheckedUpdateManyWithoutBusinessNestedInput = {
    create?: XOR<LocationCreateWithoutBusinessInput, LocationUncheckedCreateWithoutBusinessInput> | LocationCreateWithoutBusinessInput[] | LocationUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutBusinessInput | LocationCreateOrConnectWithoutBusinessInput[]
    upsert?: LocationUpsertWithWhereUniqueWithoutBusinessInput | LocationUpsertWithWhereUniqueWithoutBusinessInput[]
    createMany?: LocationCreateManyBusinessInputEnvelope
    set?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    disconnect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    delete?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    update?: LocationUpdateWithWhereUniqueWithoutBusinessInput | LocationUpdateWithWhereUniqueWithoutBusinessInput[]
    updateMany?: LocationUpdateManyWithWhereWithoutBusinessInput | LocationUpdateManyWithWhereWithoutBusinessInput[]
    deleteMany?: LocationScalarWhereInput | LocationScalarWhereInput[]
  }

  export type ContactUncheckedUpdateManyWithoutLeadNestedInput = {
    create?: XOR<ContactCreateWithoutLeadInput, ContactUncheckedCreateWithoutLeadInput> | ContactCreateWithoutLeadInput[] | ContactUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutLeadInput | ContactCreateOrConnectWithoutLeadInput[]
    upsert?: ContactUpsertWithWhereUniqueWithoutLeadInput | ContactUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: ContactCreateManyLeadInputEnvelope
    set?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    disconnect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    delete?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    update?: ContactUpdateWithWhereUniqueWithoutLeadInput | ContactUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: ContactUpdateManyWithWhereWithoutLeadInput | ContactUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: ContactScalarWhereInput | ContactScalarWhereInput[]
  }

  export type TouchPointUncheckedUpdateManyWithoutLeadNestedInput = {
    create?: XOR<TouchPointCreateWithoutLeadInput, TouchPointUncheckedCreateWithoutLeadInput> | TouchPointCreateWithoutLeadInput[] | TouchPointUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: TouchPointCreateOrConnectWithoutLeadInput | TouchPointCreateOrConnectWithoutLeadInput[]
    upsert?: TouchPointUpsertWithWhereUniqueWithoutLeadInput | TouchPointUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: TouchPointCreateManyLeadInputEnvelope
    set?: TouchPointWhereUniqueInput | TouchPointWhereUniqueInput[]
    disconnect?: TouchPointWhereUniqueInput | TouchPointWhereUniqueInput[]
    delete?: TouchPointWhereUniqueInput | TouchPointWhereUniqueInput[]
    connect?: TouchPointWhereUniqueInput | TouchPointWhereUniqueInput[]
    update?: TouchPointUpdateWithWhereUniqueWithoutLeadInput | TouchPointUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: TouchPointUpdateManyWithWhereWithoutLeadInput | TouchPointUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: TouchPointScalarWhereInput | TouchPointScalarWhereInput[]
  }

  export type NoteUncheckedUpdateManyWithoutLeadNestedInput = {
    create?: XOR<NoteCreateWithoutLeadInput, NoteUncheckedCreateWithoutLeadInput> | NoteCreateWithoutLeadInput[] | NoteUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutLeadInput | NoteCreateOrConnectWithoutLeadInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutLeadInput | NoteUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: NoteCreateManyLeadInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutLeadInput | NoteUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutLeadInput | NoteUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type ReminderUncheckedUpdateManyWithoutLeadNestedInput = {
    create?: XOR<ReminderCreateWithoutLeadInput, ReminderUncheckedCreateWithoutLeadInput> | ReminderCreateWithoutLeadInput[] | ReminderUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutLeadInput | ReminderCreateOrConnectWithoutLeadInput[]
    upsert?: ReminderUpsertWithWhereUniqueWithoutLeadInput | ReminderUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: ReminderCreateManyLeadInputEnvelope
    set?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    disconnect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    delete?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    update?: ReminderUpdateWithWhereUniqueWithoutLeadInput | ReminderUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: ReminderUpdateManyWithWhereWithoutLeadInput | ReminderUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
  }

  export type LeadUncheckedUpdateManyWithoutReferredByLeadNestedInput = {
    create?: XOR<LeadCreateWithoutReferredByLeadInput, LeadUncheckedCreateWithoutReferredByLeadInput> | LeadCreateWithoutReferredByLeadInput[] | LeadUncheckedCreateWithoutReferredByLeadInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutReferredByLeadInput | LeadCreateOrConnectWithoutReferredByLeadInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutReferredByLeadInput | LeadUpsertWithWhereUniqueWithoutReferredByLeadInput[]
    createMany?: LeadCreateManyReferredByLeadInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutReferredByLeadInput | LeadUpdateWithWhereUniqueWithoutReferredByLeadInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutReferredByLeadInput | LeadUpdateManyWithWhereWithoutReferredByLeadInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type LeadCreateNestedOneWithoutContactsInput = {
    create?: XOR<LeadCreateWithoutContactsInput, LeadUncheckedCreateWithoutContactsInput>
    connectOrCreate?: LeadCreateOrConnectWithoutContactsInput
    connect?: LeadWhereUniqueInput
  }

  export type LeadUpdateOneRequiredWithoutContactsNestedInput = {
    create?: XOR<LeadCreateWithoutContactsInput, LeadUncheckedCreateWithoutContactsInput>
    connectOrCreate?: LeadCreateOrConnectWithoutContactsInput
    upsert?: LeadUpsertWithoutContactsInput
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutContactsInput, LeadUpdateWithoutContactsInput>, LeadUncheckedUpdateWithoutContactsInput>
  }

  export type LeadCreateNestedManyWithoutIndustryInput = {
    create?: XOR<LeadCreateWithoutIndustryInput, LeadUncheckedCreateWithoutIndustryInput> | LeadCreateWithoutIndustryInput[] | LeadUncheckedCreateWithoutIndustryInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutIndustryInput | LeadCreateOrConnectWithoutIndustryInput[]
    createMany?: LeadCreateManyIndustryInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type LeadUncheckedCreateNestedManyWithoutIndustryInput = {
    create?: XOR<LeadCreateWithoutIndustryInput, LeadUncheckedCreateWithoutIndustryInput> | LeadCreateWithoutIndustryInput[] | LeadUncheckedCreateWithoutIndustryInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutIndustryInput | LeadCreateOrConnectWithoutIndustryInput[]
    createMany?: LeadCreateManyIndustryInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type LeadUpdateManyWithoutIndustryNestedInput = {
    create?: XOR<LeadCreateWithoutIndustryInput, LeadUncheckedCreateWithoutIndustryInput> | LeadCreateWithoutIndustryInput[] | LeadUncheckedCreateWithoutIndustryInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutIndustryInput | LeadCreateOrConnectWithoutIndustryInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutIndustryInput | LeadUpsertWithWhereUniqueWithoutIndustryInput[]
    createMany?: LeadCreateManyIndustryInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutIndustryInput | LeadUpdateWithWhereUniqueWithoutIndustryInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutIndustryInput | LeadUpdateManyWithWhereWithoutIndustryInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type LeadUncheckedUpdateManyWithoutIndustryNestedInput = {
    create?: XOR<LeadCreateWithoutIndustryInput, LeadUncheckedCreateWithoutIndustryInput> | LeadCreateWithoutIndustryInput[] | LeadUncheckedCreateWithoutIndustryInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutIndustryInput | LeadCreateOrConnectWithoutIndustryInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutIndustryInput | LeadUpsertWithWhereUniqueWithoutIndustryInput[]
    createMany?: LeadCreateManyIndustryInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutIndustryInput | LeadUpdateWithWhereUniqueWithoutIndustryInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutIndustryInput | LeadUpdateManyWithWhereWithoutIndustryInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type LeadCreateNestedManyWithoutBusinessTypeInput = {
    create?: XOR<LeadCreateWithoutBusinessTypeInput, LeadUncheckedCreateWithoutBusinessTypeInput> | LeadCreateWithoutBusinessTypeInput[] | LeadUncheckedCreateWithoutBusinessTypeInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutBusinessTypeInput | LeadCreateOrConnectWithoutBusinessTypeInput[]
    createMany?: LeadCreateManyBusinessTypeInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type LeadUncheckedCreateNestedManyWithoutBusinessTypeInput = {
    create?: XOR<LeadCreateWithoutBusinessTypeInput, LeadUncheckedCreateWithoutBusinessTypeInput> | LeadCreateWithoutBusinessTypeInput[] | LeadUncheckedCreateWithoutBusinessTypeInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutBusinessTypeInput | LeadCreateOrConnectWithoutBusinessTypeInput[]
    createMany?: LeadCreateManyBusinessTypeInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type LeadUpdateManyWithoutBusinessTypeNestedInput = {
    create?: XOR<LeadCreateWithoutBusinessTypeInput, LeadUncheckedCreateWithoutBusinessTypeInput> | LeadCreateWithoutBusinessTypeInput[] | LeadUncheckedCreateWithoutBusinessTypeInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutBusinessTypeInput | LeadCreateOrConnectWithoutBusinessTypeInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutBusinessTypeInput | LeadUpsertWithWhereUniqueWithoutBusinessTypeInput[]
    createMany?: LeadCreateManyBusinessTypeInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutBusinessTypeInput | LeadUpdateWithWhereUniqueWithoutBusinessTypeInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutBusinessTypeInput | LeadUpdateManyWithWhereWithoutBusinessTypeInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type LeadUncheckedUpdateManyWithoutBusinessTypeNestedInput = {
    create?: XOR<LeadCreateWithoutBusinessTypeInput, LeadUncheckedCreateWithoutBusinessTypeInput> | LeadCreateWithoutBusinessTypeInput[] | LeadUncheckedCreateWithoutBusinessTypeInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutBusinessTypeInput | LeadCreateOrConnectWithoutBusinessTypeInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutBusinessTypeInput | LeadUpsertWithWhereUniqueWithoutBusinessTypeInput[]
    createMany?: LeadCreateManyBusinessTypeInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutBusinessTypeInput | LeadUpdateWithWhereUniqueWithoutBusinessTypeInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutBusinessTypeInput | LeadUpdateManyWithWhereWithoutBusinessTypeInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type LeadCreateNestedOneWithoutLocationsInput = {
    create?: XOR<LeadCreateWithoutLocationsInput, LeadUncheckedCreateWithoutLocationsInput>
    connectOrCreate?: LeadCreateOrConnectWithoutLocationsInput
    connect?: LeadWhereUniqueInput
  }

  export type PhoneNumberCreateNestedManyWithoutLocationInput = {
    create?: XOR<PhoneNumberCreateWithoutLocationInput, PhoneNumberUncheckedCreateWithoutLocationInput> | PhoneNumberCreateWithoutLocationInput[] | PhoneNumberUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: PhoneNumberCreateOrConnectWithoutLocationInput | PhoneNumberCreateOrConnectWithoutLocationInput[]
    createMany?: PhoneNumberCreateManyLocationInputEnvelope
    connect?: PhoneNumberWhereUniqueInput | PhoneNumberWhereUniqueInput[]
  }

  export type LeadCreateNestedOneWithoutPrimaryLocationInput = {
    create?: XOR<LeadCreateWithoutPrimaryLocationInput, LeadUncheckedCreateWithoutPrimaryLocationInput>
    connectOrCreate?: LeadCreateOrConnectWithoutPrimaryLocationInput
    connect?: LeadWhereUniqueInput
  }

  export type PhoneNumberUncheckedCreateNestedManyWithoutLocationInput = {
    create?: XOR<PhoneNumberCreateWithoutLocationInput, PhoneNumberUncheckedCreateWithoutLocationInput> | PhoneNumberCreateWithoutLocationInput[] | PhoneNumberUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: PhoneNumberCreateOrConnectWithoutLocationInput | PhoneNumberCreateOrConnectWithoutLocationInput[]
    createMany?: PhoneNumberCreateManyLocationInputEnvelope
    connect?: PhoneNumberWhereUniqueInput | PhoneNumberWhereUniqueInput[]
  }

  export type LeadUncheckedCreateNestedOneWithoutPrimaryLocationInput = {
    create?: XOR<LeadCreateWithoutPrimaryLocationInput, LeadUncheckedCreateWithoutPrimaryLocationInput>
    connectOrCreate?: LeadCreateOrConnectWithoutPrimaryLocationInput
    connect?: LeadWhereUniqueInput
  }

  export type LeadUpdateOneRequiredWithoutLocationsNestedInput = {
    create?: XOR<LeadCreateWithoutLocationsInput, LeadUncheckedCreateWithoutLocationsInput>
    connectOrCreate?: LeadCreateOrConnectWithoutLocationsInput
    upsert?: LeadUpsertWithoutLocationsInput
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutLocationsInput, LeadUpdateWithoutLocationsInput>, LeadUncheckedUpdateWithoutLocationsInput>
  }

  export type PhoneNumberUpdateManyWithoutLocationNestedInput = {
    create?: XOR<PhoneNumberCreateWithoutLocationInput, PhoneNumberUncheckedCreateWithoutLocationInput> | PhoneNumberCreateWithoutLocationInput[] | PhoneNumberUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: PhoneNumberCreateOrConnectWithoutLocationInput | PhoneNumberCreateOrConnectWithoutLocationInput[]
    upsert?: PhoneNumberUpsertWithWhereUniqueWithoutLocationInput | PhoneNumberUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: PhoneNumberCreateManyLocationInputEnvelope
    set?: PhoneNumberWhereUniqueInput | PhoneNumberWhereUniqueInput[]
    disconnect?: PhoneNumberWhereUniqueInput | PhoneNumberWhereUniqueInput[]
    delete?: PhoneNumberWhereUniqueInput | PhoneNumberWhereUniqueInput[]
    connect?: PhoneNumberWhereUniqueInput | PhoneNumberWhereUniqueInput[]
    update?: PhoneNumberUpdateWithWhereUniqueWithoutLocationInput | PhoneNumberUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: PhoneNumberUpdateManyWithWhereWithoutLocationInput | PhoneNumberUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: PhoneNumberScalarWhereInput | PhoneNumberScalarWhereInput[]
  }

  export type LeadUpdateOneWithoutPrimaryLocationNestedInput = {
    create?: XOR<LeadCreateWithoutPrimaryLocationInput, LeadUncheckedCreateWithoutPrimaryLocationInput>
    connectOrCreate?: LeadCreateOrConnectWithoutPrimaryLocationInput
    upsert?: LeadUpsertWithoutPrimaryLocationInput
    disconnect?: LeadWhereInput | boolean
    delete?: LeadWhereInput | boolean
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutPrimaryLocationInput, LeadUpdateWithoutPrimaryLocationInput>, LeadUncheckedUpdateWithoutPrimaryLocationInput>
  }

  export type PhoneNumberUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<PhoneNumberCreateWithoutLocationInput, PhoneNumberUncheckedCreateWithoutLocationInput> | PhoneNumberCreateWithoutLocationInput[] | PhoneNumberUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: PhoneNumberCreateOrConnectWithoutLocationInput | PhoneNumberCreateOrConnectWithoutLocationInput[]
    upsert?: PhoneNumberUpsertWithWhereUniqueWithoutLocationInput | PhoneNumberUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: PhoneNumberCreateManyLocationInputEnvelope
    set?: PhoneNumberWhereUniqueInput | PhoneNumberWhereUniqueInput[]
    disconnect?: PhoneNumberWhereUniqueInput | PhoneNumberWhereUniqueInput[]
    delete?: PhoneNumberWhereUniqueInput | PhoneNumberWhereUniqueInput[]
    connect?: PhoneNumberWhereUniqueInput | PhoneNumberWhereUniqueInput[]
    update?: PhoneNumberUpdateWithWhereUniqueWithoutLocationInput | PhoneNumberUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: PhoneNumberUpdateManyWithWhereWithoutLocationInput | PhoneNumberUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: PhoneNumberScalarWhereInput | PhoneNumberScalarWhereInput[]
  }

  export type LeadUncheckedUpdateOneWithoutPrimaryLocationNestedInput = {
    create?: XOR<LeadCreateWithoutPrimaryLocationInput, LeadUncheckedCreateWithoutPrimaryLocationInput>
    connectOrCreate?: LeadCreateOrConnectWithoutPrimaryLocationInput
    upsert?: LeadUpsertWithoutPrimaryLocationInput
    disconnect?: LeadWhereInput | boolean
    delete?: LeadWhereInput | boolean
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutPrimaryLocationInput, LeadUpdateWithoutPrimaryLocationInput>, LeadUncheckedUpdateWithoutPrimaryLocationInput>
  }

  export type LocationCreateNestedOneWithoutPhoneNumbersInput = {
    create?: XOR<LocationCreateWithoutPhoneNumbersInput, LocationUncheckedCreateWithoutPhoneNumbersInput>
    connectOrCreate?: LocationCreateOrConnectWithoutPhoneNumbersInput
    connect?: LocationWhereUniqueInput
  }

  export type NullableEnumPhoneTypeFieldUpdateOperationsInput = {
    set?: $Enums.PhoneType | null
  }

  export type LocationUpdateOneWithoutPhoneNumbersNestedInput = {
    create?: XOR<LocationCreateWithoutPhoneNumbersInput, LocationUncheckedCreateWithoutPhoneNumbersInput>
    connectOrCreate?: LocationCreateOrConnectWithoutPhoneNumbersInput
    upsert?: LocationUpsertWithoutPhoneNumbersInput
    disconnect?: LocationWhereInput | boolean
    delete?: LocationWhereInput | boolean
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutPhoneNumbersInput, LocationUpdateWithoutPhoneNumbersInput>, LocationUncheckedUpdateWithoutPhoneNumbersInput>
  }

  export type LeadCreateNestedOneWithoutNotesInput = {
    create?: XOR<LeadCreateWithoutNotesInput, LeadUncheckedCreateWithoutNotesInput>
    connectOrCreate?: LeadCreateOrConnectWithoutNotesInput
    connect?: LeadWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutNotesInput = {
    create?: XOR<UserCreateWithoutNotesInput, UserUncheckedCreateWithoutNotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotesInput
    connect?: UserWhereUniqueInput
  }

  export type LeadUpdateOneRequiredWithoutNotesNestedInput = {
    create?: XOR<LeadCreateWithoutNotesInput, LeadUncheckedCreateWithoutNotesInput>
    connectOrCreate?: LeadCreateOrConnectWithoutNotesInput
    upsert?: LeadUpsertWithoutNotesInput
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutNotesInput, LeadUpdateWithoutNotesInput>, LeadUncheckedUpdateWithoutNotesInput>
  }

  export type UserUpdateOneRequiredWithoutNotesNestedInput = {
    create?: XOR<UserCreateWithoutNotesInput, UserUncheckedCreateWithoutNotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotesInput
    upsert?: UserUpsertWithoutNotesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotesInput, UserUpdateWithoutNotesInput>, UserUncheckedUpdateWithoutNotesInput>
  }

  export type LeadCreateNestedOneWithoutTouchPointInput = {
    create?: XOR<LeadCreateWithoutTouchPointInput, LeadUncheckedCreateWithoutTouchPointInput>
    connectOrCreate?: LeadCreateOrConnectWithoutTouchPointInput
    connect?: LeadWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTouchPointsInput = {
    create?: XOR<UserCreateWithoutTouchPointsInput, UserUncheckedCreateWithoutTouchPointsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTouchPointsInput
    connect?: UserWhereUniqueInput
  }

  export type ReminderCreateNestedManyWithoutTouchPointInput = {
    create?: XOR<ReminderCreateWithoutTouchPointInput, ReminderUncheckedCreateWithoutTouchPointInput> | ReminderCreateWithoutTouchPointInput[] | ReminderUncheckedCreateWithoutTouchPointInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutTouchPointInput | ReminderCreateOrConnectWithoutTouchPointInput[]
    createMany?: ReminderCreateManyTouchPointInputEnvelope
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
  }

  export type ReminderUncheckedCreateNestedManyWithoutTouchPointInput = {
    create?: XOR<ReminderCreateWithoutTouchPointInput, ReminderUncheckedCreateWithoutTouchPointInput> | ReminderCreateWithoutTouchPointInput[] | ReminderUncheckedCreateWithoutTouchPointInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutTouchPointInput | ReminderCreateOrConnectWithoutTouchPointInput[]
    createMany?: ReminderCreateManyTouchPointInputEnvelope
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
  }

  export type EnumTouchPointTypeFieldUpdateOperationsInput = {
    set?: $Enums.TouchPointType
  }

  export type NullableEnumSequencePositionFieldUpdateOperationsInput = {
    set?: $Enums.SequencePosition | null
  }

  export type LeadUpdateOneRequiredWithoutTouchPointNestedInput = {
    create?: XOR<LeadCreateWithoutTouchPointInput, LeadUncheckedCreateWithoutTouchPointInput>
    connectOrCreate?: LeadCreateOrConnectWithoutTouchPointInput
    upsert?: LeadUpsertWithoutTouchPointInput
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutTouchPointInput, LeadUpdateWithoutTouchPointInput>, LeadUncheckedUpdateWithoutTouchPointInput>
  }

  export type UserUpdateOneRequiredWithoutTouchPointsNestedInput = {
    create?: XOR<UserCreateWithoutTouchPointsInput, UserUncheckedCreateWithoutTouchPointsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTouchPointsInput
    upsert?: UserUpsertWithoutTouchPointsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTouchPointsInput, UserUpdateWithoutTouchPointsInput>, UserUncheckedUpdateWithoutTouchPointsInput>
  }

  export type ReminderUpdateManyWithoutTouchPointNestedInput = {
    create?: XOR<ReminderCreateWithoutTouchPointInput, ReminderUncheckedCreateWithoutTouchPointInput> | ReminderCreateWithoutTouchPointInput[] | ReminderUncheckedCreateWithoutTouchPointInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutTouchPointInput | ReminderCreateOrConnectWithoutTouchPointInput[]
    upsert?: ReminderUpsertWithWhereUniqueWithoutTouchPointInput | ReminderUpsertWithWhereUniqueWithoutTouchPointInput[]
    createMany?: ReminderCreateManyTouchPointInputEnvelope
    set?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    disconnect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    delete?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    update?: ReminderUpdateWithWhereUniqueWithoutTouchPointInput | ReminderUpdateWithWhereUniqueWithoutTouchPointInput[]
    updateMany?: ReminderUpdateManyWithWhereWithoutTouchPointInput | ReminderUpdateManyWithWhereWithoutTouchPointInput[]
    deleteMany?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
  }

  export type ReminderUncheckedUpdateManyWithoutTouchPointNestedInput = {
    create?: XOR<ReminderCreateWithoutTouchPointInput, ReminderUncheckedCreateWithoutTouchPointInput> | ReminderCreateWithoutTouchPointInput[] | ReminderUncheckedCreateWithoutTouchPointInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutTouchPointInput | ReminderCreateOrConnectWithoutTouchPointInput[]
    upsert?: ReminderUpsertWithWhereUniqueWithoutTouchPointInput | ReminderUpsertWithWhereUniqueWithoutTouchPointInput[]
    createMany?: ReminderCreateManyTouchPointInputEnvelope
    set?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    disconnect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    delete?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    update?: ReminderUpdateWithWhereUniqueWithoutTouchPointInput | ReminderUpdateWithWhereUniqueWithoutTouchPointInput[]
    updateMany?: ReminderUpdateManyWithWhereWithoutTouchPointInput | ReminderUpdateManyWithWhereWithoutTouchPointInput[]
    deleteMany?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
  }

  export type LeadCreateNestedOneWithoutRemindersInput = {
    create?: XOR<LeadCreateWithoutRemindersInput, LeadUncheckedCreateWithoutRemindersInput>
    connectOrCreate?: LeadCreateOrConnectWithoutRemindersInput
    connect?: LeadWhereUniqueInput
  }

  export type TouchPointCreateNestedOneWithoutRemindersInput = {
    create?: XOR<TouchPointCreateWithoutRemindersInput, TouchPointUncheckedCreateWithoutRemindersInput>
    connectOrCreate?: TouchPointCreateOrConnectWithoutRemindersInput
    connect?: TouchPointWhereUniqueInput
  }

  export type LeadUpdateOneRequiredWithoutRemindersNestedInput = {
    create?: XOR<LeadCreateWithoutRemindersInput, LeadUncheckedCreateWithoutRemindersInput>
    connectOrCreate?: LeadCreateOrConnectWithoutRemindersInput
    upsert?: LeadUpsertWithoutRemindersInput
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutRemindersInput, LeadUpdateWithoutRemindersInput>, LeadUncheckedUpdateWithoutRemindersInput>
  }

  export type TouchPointUpdateOneWithoutRemindersNestedInput = {
    create?: XOR<TouchPointCreateWithoutRemindersInput, TouchPointUncheckedCreateWithoutRemindersInput>
    connectOrCreate?: TouchPointCreateOrConnectWithoutRemindersInput
    upsert?: TouchPointUpsertWithoutRemindersInput
    disconnect?: TouchPointWhereInput | boolean
    delete?: TouchPointWhereInput | boolean
    connect?: TouchPointWhereUniqueInput
    update?: XOR<XOR<TouchPointUpdateToOneWithWhereWithoutRemindersInput, TouchPointUpdateWithoutRemindersInput>, TouchPointUncheckedUpdateWithoutRemindersInput>
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

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type NestedEnumPipelineStageFilter<$PrismaModel = never> = {
    equals?: $Enums.PipelineStage | EnumPipelineStageFieldRefInput<$PrismaModel>
    in?: $Enums.PipelineStage[] | ListEnumPipelineStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.PipelineStage[] | ListEnumPipelineStageFieldRefInput<$PrismaModel>
    not?: NestedEnumPipelineStageFilter<$PrismaModel> | $Enums.PipelineStage
  }

  export type NestedEnumLeadSourceNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadSource | EnumLeadSourceFieldRefInput<$PrismaModel> | null
    in?: $Enums.LeadSource[] | ListEnumLeadSourceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.LeadSource[] | ListEnumLeadSourceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumLeadSourceNullableFilter<$PrismaModel> | $Enums.LeadSource | null
  }

  export type NestedEnumDiscoveredViaNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.DiscoveredVia | EnumDiscoveredViaFieldRefInput<$PrismaModel> | null
    in?: $Enums.DiscoveredVia[] | ListEnumDiscoveredViaFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DiscoveredVia[] | ListEnumDiscoveredViaFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDiscoveredViaNullableFilter<$PrismaModel> | $Enums.DiscoveredVia | null
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumPriorityNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel> | null
    in?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPriorityNullableFilter<$PrismaModel> | $Enums.Priority | null
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

  export type NestedEnumPipelineStageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PipelineStage | EnumPipelineStageFieldRefInput<$PrismaModel>
    in?: $Enums.PipelineStage[] | ListEnumPipelineStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.PipelineStage[] | ListEnumPipelineStageFieldRefInput<$PrismaModel>
    not?: NestedEnumPipelineStageWithAggregatesFilter<$PrismaModel> | $Enums.PipelineStage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPipelineStageFilter<$PrismaModel>
    _max?: NestedEnumPipelineStageFilter<$PrismaModel>
  }

  export type NestedEnumLeadSourceNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadSource | EnumLeadSourceFieldRefInput<$PrismaModel> | null
    in?: $Enums.LeadSource[] | ListEnumLeadSourceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.LeadSource[] | ListEnumLeadSourceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumLeadSourceNullableWithAggregatesFilter<$PrismaModel> | $Enums.LeadSource | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumLeadSourceNullableFilter<$PrismaModel>
    _max?: NestedEnumLeadSourceNullableFilter<$PrismaModel>
  }

  export type NestedEnumDiscoveredViaNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DiscoveredVia | EnumDiscoveredViaFieldRefInput<$PrismaModel> | null
    in?: $Enums.DiscoveredVia[] | ListEnumDiscoveredViaFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.DiscoveredVia[] | ListEnumDiscoveredViaFieldRefInput<$PrismaModel> | null
    not?: NestedEnumDiscoveredViaNullableWithAggregatesFilter<$PrismaModel> | $Enums.DiscoveredVia | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumDiscoveredViaNullableFilter<$PrismaModel>
    _max?: NestedEnumDiscoveredViaNullableFilter<$PrismaModel>
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumPriorityNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel> | null
    in?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPriorityNullableWithAggregatesFilter<$PrismaModel> | $Enums.Priority | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumPriorityNullableFilter<$PrismaModel>
    _max?: NestedEnumPriorityNullableFilter<$PrismaModel>
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

  export type NestedEnumPhoneTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.PhoneType | EnumPhoneTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.PhoneType[] | ListEnumPhoneTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PhoneType[] | ListEnumPhoneTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPhoneTypeNullableFilter<$PrismaModel> | $Enums.PhoneType | null
  }

  export type NestedEnumPhoneTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PhoneType | EnumPhoneTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.PhoneType[] | ListEnumPhoneTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PhoneType[] | ListEnumPhoneTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPhoneTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.PhoneType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumPhoneTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumPhoneTypeNullableFilter<$PrismaModel>
  }

  export type NestedEnumTouchPointTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TouchPointType | EnumTouchPointTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TouchPointType[] | ListEnumTouchPointTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TouchPointType[] | ListEnumTouchPointTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTouchPointTypeFilter<$PrismaModel> | $Enums.TouchPointType
  }

  export type NestedEnumSequencePositionNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.SequencePosition | EnumSequencePositionFieldRefInput<$PrismaModel> | null
    in?: $Enums.SequencePosition[] | ListEnumSequencePositionFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.SequencePosition[] | ListEnumSequencePositionFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSequencePositionNullableFilter<$PrismaModel> | $Enums.SequencePosition | null
  }

  export type NestedEnumTouchPointTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TouchPointType | EnumTouchPointTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TouchPointType[] | ListEnumTouchPointTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TouchPointType[] | ListEnumTouchPointTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTouchPointTypeWithAggregatesFilter<$PrismaModel> | $Enums.TouchPointType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTouchPointTypeFilter<$PrismaModel>
    _max?: NestedEnumTouchPointTypeFilter<$PrismaModel>
  }

  export type NestedEnumSequencePositionNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SequencePosition | EnumSequencePositionFieldRefInput<$PrismaModel> | null
    in?: $Enums.SequencePosition[] | ListEnumSequencePositionFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.SequencePosition[] | ListEnumSequencePositionFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSequencePositionNullableWithAggregatesFilter<$PrismaModel> | $Enums.SequencePosition | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumSequencePositionNullableFilter<$PrismaModel>
    _max?: NestedEnumSequencePositionNullableFilter<$PrismaModel>
  }

  export type TouchPointCreateWithoutContactedByInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    date: Date | string
    type: $Enums.TouchPointType
    receivedResponse?: boolean
    summary?: string | null
    sequencePosition?: $Enums.SequencePosition | null
    lead: LeadCreateNestedOneWithoutTouchPointInput
    reminders?: ReminderCreateNestedManyWithoutTouchPointInput
  }

  export type TouchPointUncheckedCreateWithoutContactedByInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    date: Date | string
    type: $Enums.TouchPointType
    leadId: string
    receivedResponse?: boolean
    summary?: string | null
    sequencePosition?: $Enums.SequencePosition | null
    reminders?: ReminderUncheckedCreateNestedManyWithoutTouchPointInput
  }

  export type TouchPointCreateOrConnectWithoutContactedByInput = {
    where: TouchPointWhereUniqueInput
    create: XOR<TouchPointCreateWithoutContactedByInput, TouchPointUncheckedCreateWithoutContactedByInput>
  }

  export type TouchPointCreateManyContactedByInputEnvelope = {
    data: TouchPointCreateManyContactedByInput | TouchPointCreateManyContactedByInput[]
    skipDuplicates?: boolean
  }

  export type NoteCreateWithoutAuthorInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    text: string
    lead: LeadCreateNestedOneWithoutNotesInput
  }

  export type NoteUncheckedCreateWithoutAuthorInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    text: string
    leadId: string
  }

  export type NoteCreateOrConnectWithoutAuthorInput = {
    where: NoteWhereUniqueInput
    create: XOR<NoteCreateWithoutAuthorInput, NoteUncheckedCreateWithoutAuthorInput>
  }

  export type NoteCreateManyAuthorInputEnvelope = {
    data: NoteCreateManyAuthorInput | NoteCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type LeadCreateWithoutAssignedToInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
    locations?: LocationCreateNestedManyWithoutBusinessInput
    primaryLocation?: LocationCreateNestedOneWithoutPrimaryForBusinessInput
    contacts?: ContactCreateNestedManyWithoutLeadInput
    industry: IndustryCreateNestedOneWithoutLeadsInput
    businessType: BusinessTypeCreateNestedOneWithoutLeadsInput
    touchPoint?: TouchPointCreateNestedManyWithoutLeadInput
    notes?: NoteCreateNestedManyWithoutLeadInput
    reminders?: ReminderCreateNestedManyWithoutLeadInput
    referredByLead?: LeadCreateNestedOneWithoutReferralsInput
    referrals?: LeadCreateNestedManyWithoutReferredByLeadInput
  }

  export type LeadUncheckedCreateWithoutAssignedToInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    primaryLocationId?: string | null
    industryId: string
    businessTypeId: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    referredByLeadId?: string | null
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
    locations?: LocationUncheckedCreateNestedManyWithoutBusinessInput
    contacts?: ContactUncheckedCreateNestedManyWithoutLeadInput
    touchPoint?: TouchPointUncheckedCreateNestedManyWithoutLeadInput
    notes?: NoteUncheckedCreateNestedManyWithoutLeadInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutLeadInput
    referrals?: LeadUncheckedCreateNestedManyWithoutReferredByLeadInput
  }

  export type LeadCreateOrConnectWithoutAssignedToInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutAssignedToInput, LeadUncheckedCreateWithoutAssignedToInput>
  }

  export type LeadCreateManyAssignedToInputEnvelope = {
    data: LeadCreateManyAssignedToInput | LeadCreateManyAssignedToInput[]
    skipDuplicates?: boolean
  }

  export type TouchPointUpsertWithWhereUniqueWithoutContactedByInput = {
    where: TouchPointWhereUniqueInput
    update: XOR<TouchPointUpdateWithoutContactedByInput, TouchPointUncheckedUpdateWithoutContactedByInput>
    create: XOR<TouchPointCreateWithoutContactedByInput, TouchPointUncheckedCreateWithoutContactedByInput>
  }

  export type TouchPointUpdateWithWhereUniqueWithoutContactedByInput = {
    where: TouchPointWhereUniqueInput
    data: XOR<TouchPointUpdateWithoutContactedByInput, TouchPointUncheckedUpdateWithoutContactedByInput>
  }

  export type TouchPointUpdateManyWithWhereWithoutContactedByInput = {
    where: TouchPointScalarWhereInput
    data: XOR<TouchPointUpdateManyMutationInput, TouchPointUncheckedUpdateManyWithoutContactedByInput>
  }

  export type TouchPointScalarWhereInput = {
    AND?: TouchPointScalarWhereInput | TouchPointScalarWhereInput[]
    OR?: TouchPointScalarWhereInput[]
    NOT?: TouchPointScalarWhereInput | TouchPointScalarWhereInput[]
    id?: StringFilter<"TouchPoint"> | string
    createdAt?: DateTimeFilter<"TouchPoint"> | Date | string
    updatedAt?: DateTimeFilter<"TouchPoint"> | Date | string
    date?: DateTimeFilter<"TouchPoint"> | Date | string
    type?: EnumTouchPointTypeFilter<"TouchPoint"> | $Enums.TouchPointType
    leadId?: StringFilter<"TouchPoint"> | string
    contactedById?: StringFilter<"TouchPoint"> | string
    receivedResponse?: BoolFilter<"TouchPoint"> | boolean
    summary?: StringNullableFilter<"TouchPoint"> | string | null
    sequencePosition?: EnumSequencePositionNullableFilter<"TouchPoint"> | $Enums.SequencePosition | null
  }

  export type NoteUpsertWithWhereUniqueWithoutAuthorInput = {
    where: NoteWhereUniqueInput
    update: XOR<NoteUpdateWithoutAuthorInput, NoteUncheckedUpdateWithoutAuthorInput>
    create: XOR<NoteCreateWithoutAuthorInput, NoteUncheckedCreateWithoutAuthorInput>
  }

  export type NoteUpdateWithWhereUniqueWithoutAuthorInput = {
    where: NoteWhereUniqueInput
    data: XOR<NoteUpdateWithoutAuthorInput, NoteUncheckedUpdateWithoutAuthorInput>
  }

  export type NoteUpdateManyWithWhereWithoutAuthorInput = {
    where: NoteScalarWhereInput
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyWithoutAuthorInput>
  }

  export type NoteScalarWhereInput = {
    AND?: NoteScalarWhereInput | NoteScalarWhereInput[]
    OR?: NoteScalarWhereInput[]
    NOT?: NoteScalarWhereInput | NoteScalarWhereInput[]
    id?: StringFilter<"Note"> | string
    createdAt?: DateTimeFilter<"Note"> | Date | string
    updatedAt?: DateTimeFilter<"Note"> | Date | string
    text?: StringFilter<"Note"> | string
    leadId?: StringFilter<"Note"> | string
    userId?: StringFilter<"Note"> | string
  }

  export type LeadUpsertWithWhereUniqueWithoutAssignedToInput = {
    where: LeadWhereUniqueInput
    update: XOR<LeadUpdateWithoutAssignedToInput, LeadUncheckedUpdateWithoutAssignedToInput>
    create: XOR<LeadCreateWithoutAssignedToInput, LeadUncheckedCreateWithoutAssignedToInput>
  }

  export type LeadUpdateWithWhereUniqueWithoutAssignedToInput = {
    where: LeadWhereUniqueInput
    data: XOR<LeadUpdateWithoutAssignedToInput, LeadUncheckedUpdateWithoutAssignedToInput>
  }

  export type LeadUpdateManyWithWhereWithoutAssignedToInput = {
    where: LeadScalarWhereInput
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyWithoutAssignedToInput>
  }

  export type LeadScalarWhereInput = {
    AND?: LeadScalarWhereInput | LeadScalarWhereInput[]
    OR?: LeadScalarWhereInput[]
    NOT?: LeadScalarWhereInput | LeadScalarWhereInput[]
    id?: StringFilter<"Lead"> | string
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
    business?: StringFilter<"Lead"> | string
    primaryLocationId?: StringNullableFilter<"Lead"> | string | null
    industryId?: StringFilter<"Lead"> | string
    businessTypeId?: StringFilter<"Lead"> | string
    igHandle?: StringNullableFilter<"Lead"> | string | null
    igFollowerCount?: IntNullableFilter<"Lead"> | number | null
    email?: StringNullableFilter<"Lead"> | string | null
    website?: StringNullableFilter<"Lead"> | string | null
    pipelineStage?: EnumPipelineStageFilter<"Lead"> | $Enums.PipelineStage
    source?: EnumLeadSourceNullableFilter<"Lead"> | $Enums.LeadSource | null
    discoveredVia?: EnumDiscoveredViaNullableFilter<"Lead"> | $Enums.DiscoveredVia | null
    discoveredViaOther?: StringNullableFilter<"Lead"> | string | null
    convertedAt?: DateTimeNullableFilter<"Lead"> | Date | string | null
    isBlackOwned?: BoolFilter<"Lead"> | boolean
    isWomanOwned?: BoolFilter<"Lead"> | boolean
    isLatinoOwned?: BoolFilter<"Lead"> | boolean
    isImmigrantOwned?: BoolFilter<"Lead"> | boolean
    priority?: EnumPriorityNullableFilter<"Lead"> | $Enums.Priority | null
    sequenceStep?: IntFilter<"Lead"> | number
    sequenceActive?: BoolFilter<"Lead"> | boolean
    isHot?: BoolFilter<"Lead"> | boolean
    assignedToId?: StringNullableFilter<"Lead"> | string | null
    referredByLeadId?: StringNullableFilter<"Lead"> | string | null
    referredByName?: StringNullableFilter<"Lead"> | string | null
    instagramHandle?: StringNullableFilter<"Lead"> | string | null
    instagramFollowers?: IntNullableFilter<"Lead"> | number | null
    tiktokHandle?: StringNullableFilter<"Lead"> | string | null
    tiktokFollowers?: IntNullableFilter<"Lead"> | number | null
    youtubeHandle?: StringNullableFilter<"Lead"> | string | null
    youtubeFollowers?: IntNullableFilter<"Lead"> | number | null
    facebookHandle?: StringNullableFilter<"Lead"> | string | null
    facebookFollowers?: IntNullableFilter<"Lead"> | number | null
  }

  export type LocationCreateWithoutBusinessInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    addressLine1: string
    addressLine2?: string | null
    city: string
    state: string
    zip: string
    phoneNumbers?: PhoneNumberCreateNestedManyWithoutLocationInput
    primaryForBusiness?: LeadCreateNestedOneWithoutPrimaryLocationInput
  }

  export type LocationUncheckedCreateWithoutBusinessInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    addressLine1: string
    addressLine2?: string | null
    city: string
    state: string
    zip: string
    phoneNumbers?: PhoneNumberUncheckedCreateNestedManyWithoutLocationInput
    primaryForBusiness?: LeadUncheckedCreateNestedOneWithoutPrimaryLocationInput
  }

  export type LocationCreateOrConnectWithoutBusinessInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutBusinessInput, LocationUncheckedCreateWithoutBusinessInput>
  }

  export type LocationCreateManyBusinessInputEnvelope = {
    data: LocationCreateManyBusinessInput | LocationCreateManyBusinessInput[]
    skipDuplicates?: boolean
  }

  export type LocationCreateWithoutPrimaryForBusinessInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    addressLine1: string
    addressLine2?: string | null
    city: string
    state: string
    zip: string
    business: LeadCreateNestedOneWithoutLocationsInput
    phoneNumbers?: PhoneNumberCreateNestedManyWithoutLocationInput
  }

  export type LocationUncheckedCreateWithoutPrimaryForBusinessInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    businessId: string
    addressLine1: string
    addressLine2?: string | null
    city: string
    state: string
    zip: string
    phoneNumbers?: PhoneNumberUncheckedCreateNestedManyWithoutLocationInput
  }

  export type LocationCreateOrConnectWithoutPrimaryForBusinessInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutPrimaryForBusinessInput, LocationUncheckedCreateWithoutPrimaryForBusinessInput>
  }

  export type ContactCreateWithoutLeadInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    title?: string | null
    email?: string | null
    phone?: string | null
    isDecisionMaker?: boolean
    notes?: string | null
  }

  export type ContactUncheckedCreateWithoutLeadInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    title?: string | null
    email?: string | null
    phone?: string | null
    isDecisionMaker?: boolean
    notes?: string | null
  }

  export type ContactCreateOrConnectWithoutLeadInput = {
    where: ContactWhereUniqueInput
    create: XOR<ContactCreateWithoutLeadInput, ContactUncheckedCreateWithoutLeadInput>
  }

  export type ContactCreateManyLeadInputEnvelope = {
    data: ContactCreateManyLeadInput | ContactCreateManyLeadInput[]
    skipDuplicates?: boolean
  }

  export type IndustryCreateWithoutLeadsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
  }

  export type IndustryUncheckedCreateWithoutLeadsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
  }

  export type IndustryCreateOrConnectWithoutLeadsInput = {
    where: IndustryWhereUniqueInput
    create: XOR<IndustryCreateWithoutLeadsInput, IndustryUncheckedCreateWithoutLeadsInput>
  }

  export type BusinessTypeCreateWithoutLeadsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
  }

  export type BusinessTypeUncheckedCreateWithoutLeadsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
  }

  export type BusinessTypeCreateOrConnectWithoutLeadsInput = {
    where: BusinessTypeWhereUniqueInput
    create: XOR<BusinessTypeCreateWithoutLeadsInput, BusinessTypeUncheckedCreateWithoutLeadsInput>
  }

  export type TouchPointCreateWithoutLeadInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    date: Date | string
    type: $Enums.TouchPointType
    receivedResponse?: boolean
    summary?: string | null
    sequencePosition?: $Enums.SequencePosition | null
    contactedBy: UserCreateNestedOneWithoutTouchPointsInput
    reminders?: ReminderCreateNestedManyWithoutTouchPointInput
  }

  export type TouchPointUncheckedCreateWithoutLeadInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    date: Date | string
    type: $Enums.TouchPointType
    contactedById: string
    receivedResponse?: boolean
    summary?: string | null
    sequencePosition?: $Enums.SequencePosition | null
    reminders?: ReminderUncheckedCreateNestedManyWithoutTouchPointInput
  }

  export type TouchPointCreateOrConnectWithoutLeadInput = {
    where: TouchPointWhereUniqueInput
    create: XOR<TouchPointCreateWithoutLeadInput, TouchPointUncheckedCreateWithoutLeadInput>
  }

  export type TouchPointCreateManyLeadInputEnvelope = {
    data: TouchPointCreateManyLeadInput | TouchPointCreateManyLeadInput[]
    skipDuplicates?: boolean
  }

  export type NoteCreateWithoutLeadInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    text: string
    author: UserCreateNestedOneWithoutNotesInput
  }

  export type NoteUncheckedCreateWithoutLeadInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    text: string
    userId: string
  }

  export type NoteCreateOrConnectWithoutLeadInput = {
    where: NoteWhereUniqueInput
    create: XOR<NoteCreateWithoutLeadInput, NoteUncheckedCreateWithoutLeadInput>
  }

  export type NoteCreateManyLeadInputEnvelope = {
    data: NoteCreateManyLeadInput | NoteCreateManyLeadInput[]
    skipDuplicates?: boolean
  }

  export type ReminderCreateWithoutLeadInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    type: $Enums.TouchPointType
    dueDate: Date | string
    note?: string | null
    completed?: boolean
    completedAt?: Date | string | null
    isCheckIn?: boolean
    isResponseCheck?: boolean
    isEmailSentCheck?: boolean
    touchPoint?: TouchPointCreateNestedOneWithoutRemindersInput
  }

  export type ReminderUncheckedCreateWithoutLeadInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    touchPointId?: string | null
    type: $Enums.TouchPointType
    dueDate: Date | string
    note?: string | null
    completed?: boolean
    completedAt?: Date | string | null
    isCheckIn?: boolean
    isResponseCheck?: boolean
    isEmailSentCheck?: boolean
  }

  export type ReminderCreateOrConnectWithoutLeadInput = {
    where: ReminderWhereUniqueInput
    create: XOR<ReminderCreateWithoutLeadInput, ReminderUncheckedCreateWithoutLeadInput>
  }

  export type ReminderCreateManyLeadInputEnvelope = {
    data: ReminderCreateManyLeadInput | ReminderCreateManyLeadInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutAssignedLeadsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    email: string
    password: string
    role: $Enums.Role
    touchPoints?: TouchPointCreateNestedManyWithoutContactedByInput
    notes?: NoteCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutAssignedLeadsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    email: string
    password: string
    role: $Enums.Role
    touchPoints?: TouchPointUncheckedCreateNestedManyWithoutContactedByInput
    notes?: NoteUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutAssignedLeadsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssignedLeadsInput, UserUncheckedCreateWithoutAssignedLeadsInput>
  }

  export type LeadCreateWithoutReferralsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
    locations?: LocationCreateNestedManyWithoutBusinessInput
    primaryLocation?: LocationCreateNestedOneWithoutPrimaryForBusinessInput
    contacts?: ContactCreateNestedManyWithoutLeadInput
    industry: IndustryCreateNestedOneWithoutLeadsInput
    businessType: BusinessTypeCreateNestedOneWithoutLeadsInput
    touchPoint?: TouchPointCreateNestedManyWithoutLeadInput
    notes?: NoteCreateNestedManyWithoutLeadInput
    reminders?: ReminderCreateNestedManyWithoutLeadInput
    assignedTo?: UserCreateNestedOneWithoutAssignedLeadsInput
    referredByLead?: LeadCreateNestedOneWithoutReferralsInput
  }

  export type LeadUncheckedCreateWithoutReferralsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    primaryLocationId?: string | null
    industryId: string
    businessTypeId: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    assignedToId?: string | null
    referredByLeadId?: string | null
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
    locations?: LocationUncheckedCreateNestedManyWithoutBusinessInput
    contacts?: ContactUncheckedCreateNestedManyWithoutLeadInput
    touchPoint?: TouchPointUncheckedCreateNestedManyWithoutLeadInput
    notes?: NoteUncheckedCreateNestedManyWithoutLeadInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutReferralsInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutReferralsInput, LeadUncheckedCreateWithoutReferralsInput>
  }

  export type LeadCreateWithoutReferredByLeadInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
    locations?: LocationCreateNestedManyWithoutBusinessInput
    primaryLocation?: LocationCreateNestedOneWithoutPrimaryForBusinessInput
    contacts?: ContactCreateNestedManyWithoutLeadInput
    industry: IndustryCreateNestedOneWithoutLeadsInput
    businessType: BusinessTypeCreateNestedOneWithoutLeadsInput
    touchPoint?: TouchPointCreateNestedManyWithoutLeadInput
    notes?: NoteCreateNestedManyWithoutLeadInput
    reminders?: ReminderCreateNestedManyWithoutLeadInput
    assignedTo?: UserCreateNestedOneWithoutAssignedLeadsInput
    referrals?: LeadCreateNestedManyWithoutReferredByLeadInput
  }

  export type LeadUncheckedCreateWithoutReferredByLeadInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    primaryLocationId?: string | null
    industryId: string
    businessTypeId: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    assignedToId?: string | null
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
    locations?: LocationUncheckedCreateNestedManyWithoutBusinessInput
    contacts?: ContactUncheckedCreateNestedManyWithoutLeadInput
    touchPoint?: TouchPointUncheckedCreateNestedManyWithoutLeadInput
    notes?: NoteUncheckedCreateNestedManyWithoutLeadInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutLeadInput
    referrals?: LeadUncheckedCreateNestedManyWithoutReferredByLeadInput
  }

  export type LeadCreateOrConnectWithoutReferredByLeadInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutReferredByLeadInput, LeadUncheckedCreateWithoutReferredByLeadInput>
  }

  export type LeadCreateManyReferredByLeadInputEnvelope = {
    data: LeadCreateManyReferredByLeadInput | LeadCreateManyReferredByLeadInput[]
    skipDuplicates?: boolean
  }

  export type LocationUpsertWithWhereUniqueWithoutBusinessInput = {
    where: LocationWhereUniqueInput
    update: XOR<LocationUpdateWithoutBusinessInput, LocationUncheckedUpdateWithoutBusinessInput>
    create: XOR<LocationCreateWithoutBusinessInput, LocationUncheckedCreateWithoutBusinessInput>
  }

  export type LocationUpdateWithWhereUniqueWithoutBusinessInput = {
    where: LocationWhereUniqueInput
    data: XOR<LocationUpdateWithoutBusinessInput, LocationUncheckedUpdateWithoutBusinessInput>
  }

  export type LocationUpdateManyWithWhereWithoutBusinessInput = {
    where: LocationScalarWhereInput
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyWithoutBusinessInput>
  }

  export type LocationScalarWhereInput = {
    AND?: LocationScalarWhereInput | LocationScalarWhereInput[]
    OR?: LocationScalarWhereInput[]
    NOT?: LocationScalarWhereInput | LocationScalarWhereInput[]
    id?: StringFilter<"Location"> | string
    createdAt?: DateTimeFilter<"Location"> | Date | string
    updatedAt?: DateTimeFilter<"Location"> | Date | string
    businessId?: StringFilter<"Location"> | string
    addressLine1?: StringFilter<"Location"> | string
    addressLine2?: StringNullableFilter<"Location"> | string | null
    city?: StringFilter<"Location"> | string
    state?: StringFilter<"Location"> | string
    zip?: StringFilter<"Location"> | string
  }

  export type LocationUpsertWithoutPrimaryForBusinessInput = {
    update: XOR<LocationUpdateWithoutPrimaryForBusinessInput, LocationUncheckedUpdateWithoutPrimaryForBusinessInput>
    create: XOR<LocationCreateWithoutPrimaryForBusinessInput, LocationUncheckedCreateWithoutPrimaryForBusinessInput>
    where?: LocationWhereInput
  }

  export type LocationUpdateToOneWithWhereWithoutPrimaryForBusinessInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutPrimaryForBusinessInput, LocationUncheckedUpdateWithoutPrimaryForBusinessInput>
  }

  export type LocationUpdateWithoutPrimaryForBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
    business?: LeadUpdateOneRequiredWithoutLocationsNestedInput
    phoneNumbers?: PhoneNumberUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutPrimaryForBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    businessId?: StringFieldUpdateOperationsInput | string
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
    phoneNumbers?: PhoneNumberUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type ContactUpsertWithWhereUniqueWithoutLeadInput = {
    where: ContactWhereUniqueInput
    update: XOR<ContactUpdateWithoutLeadInput, ContactUncheckedUpdateWithoutLeadInput>
    create: XOR<ContactCreateWithoutLeadInput, ContactUncheckedCreateWithoutLeadInput>
  }

  export type ContactUpdateWithWhereUniqueWithoutLeadInput = {
    where: ContactWhereUniqueInput
    data: XOR<ContactUpdateWithoutLeadInput, ContactUncheckedUpdateWithoutLeadInput>
  }

  export type ContactUpdateManyWithWhereWithoutLeadInput = {
    where: ContactScalarWhereInput
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyWithoutLeadInput>
  }

  export type ContactScalarWhereInput = {
    AND?: ContactScalarWhereInput | ContactScalarWhereInput[]
    OR?: ContactScalarWhereInput[]
    NOT?: ContactScalarWhereInput | ContactScalarWhereInput[]
    id?: StringFilter<"Contact"> | string
    createdAt?: DateTimeFilter<"Contact"> | Date | string
    updatedAt?: DateTimeFilter<"Contact"> | Date | string
    firstName?: StringFilter<"Contact"> | string
    lastName?: StringFilter<"Contact"> | string
    title?: StringNullableFilter<"Contact"> | string | null
    email?: StringNullableFilter<"Contact"> | string | null
    phone?: StringNullableFilter<"Contact"> | string | null
    isDecisionMaker?: BoolFilter<"Contact"> | boolean
    notes?: StringNullableFilter<"Contact"> | string | null
    leadId?: StringFilter<"Contact"> | string
  }

  export type IndustryUpsertWithoutLeadsInput = {
    update: XOR<IndustryUpdateWithoutLeadsInput, IndustryUncheckedUpdateWithoutLeadsInput>
    create: XOR<IndustryCreateWithoutLeadsInput, IndustryUncheckedCreateWithoutLeadsInput>
    where?: IndustryWhereInput
  }

  export type IndustryUpdateToOneWithWhereWithoutLeadsInput = {
    where?: IndustryWhereInput
    data: XOR<IndustryUpdateWithoutLeadsInput, IndustryUncheckedUpdateWithoutLeadsInput>
  }

  export type IndustryUpdateWithoutLeadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type IndustryUncheckedUpdateWithoutLeadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type BusinessTypeUpsertWithoutLeadsInput = {
    update: XOR<BusinessTypeUpdateWithoutLeadsInput, BusinessTypeUncheckedUpdateWithoutLeadsInput>
    create: XOR<BusinessTypeCreateWithoutLeadsInput, BusinessTypeUncheckedCreateWithoutLeadsInput>
    where?: BusinessTypeWhereInput
  }

  export type BusinessTypeUpdateToOneWithWhereWithoutLeadsInput = {
    where?: BusinessTypeWhereInput
    data: XOR<BusinessTypeUpdateWithoutLeadsInput, BusinessTypeUncheckedUpdateWithoutLeadsInput>
  }

  export type BusinessTypeUpdateWithoutLeadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type BusinessTypeUncheckedUpdateWithoutLeadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TouchPointUpsertWithWhereUniqueWithoutLeadInput = {
    where: TouchPointWhereUniqueInput
    update: XOR<TouchPointUpdateWithoutLeadInput, TouchPointUncheckedUpdateWithoutLeadInput>
    create: XOR<TouchPointCreateWithoutLeadInput, TouchPointUncheckedCreateWithoutLeadInput>
  }

  export type TouchPointUpdateWithWhereUniqueWithoutLeadInput = {
    where: TouchPointWhereUniqueInput
    data: XOR<TouchPointUpdateWithoutLeadInput, TouchPointUncheckedUpdateWithoutLeadInput>
  }

  export type TouchPointUpdateManyWithWhereWithoutLeadInput = {
    where: TouchPointScalarWhereInput
    data: XOR<TouchPointUpdateManyMutationInput, TouchPointUncheckedUpdateManyWithoutLeadInput>
  }

  export type NoteUpsertWithWhereUniqueWithoutLeadInput = {
    where: NoteWhereUniqueInput
    update: XOR<NoteUpdateWithoutLeadInput, NoteUncheckedUpdateWithoutLeadInput>
    create: XOR<NoteCreateWithoutLeadInput, NoteUncheckedCreateWithoutLeadInput>
  }

  export type NoteUpdateWithWhereUniqueWithoutLeadInput = {
    where: NoteWhereUniqueInput
    data: XOR<NoteUpdateWithoutLeadInput, NoteUncheckedUpdateWithoutLeadInput>
  }

  export type NoteUpdateManyWithWhereWithoutLeadInput = {
    where: NoteScalarWhereInput
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyWithoutLeadInput>
  }

  export type ReminderUpsertWithWhereUniqueWithoutLeadInput = {
    where: ReminderWhereUniqueInput
    update: XOR<ReminderUpdateWithoutLeadInput, ReminderUncheckedUpdateWithoutLeadInput>
    create: XOR<ReminderCreateWithoutLeadInput, ReminderUncheckedCreateWithoutLeadInput>
  }

  export type ReminderUpdateWithWhereUniqueWithoutLeadInput = {
    where: ReminderWhereUniqueInput
    data: XOR<ReminderUpdateWithoutLeadInput, ReminderUncheckedUpdateWithoutLeadInput>
  }

  export type ReminderUpdateManyWithWhereWithoutLeadInput = {
    where: ReminderScalarWhereInput
    data: XOR<ReminderUpdateManyMutationInput, ReminderUncheckedUpdateManyWithoutLeadInput>
  }

  export type ReminderScalarWhereInput = {
    AND?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
    OR?: ReminderScalarWhereInput[]
    NOT?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
    id?: StringFilter<"Reminder"> | string
    createdAt?: DateTimeFilter<"Reminder"> | Date | string
    updatedAt?: DateTimeFilter<"Reminder"> | Date | string
    leadId?: StringFilter<"Reminder"> | string
    touchPointId?: StringNullableFilter<"Reminder"> | string | null
    type?: EnumTouchPointTypeFilter<"Reminder"> | $Enums.TouchPointType
    dueDate?: DateTimeFilter<"Reminder"> | Date | string
    note?: StringNullableFilter<"Reminder"> | string | null
    completed?: BoolFilter<"Reminder"> | boolean
    completedAt?: DateTimeNullableFilter<"Reminder"> | Date | string | null
    isCheckIn?: BoolFilter<"Reminder"> | boolean
    isResponseCheck?: BoolFilter<"Reminder"> | boolean
    isEmailSentCheck?: BoolFilter<"Reminder"> | boolean
  }

  export type UserUpsertWithoutAssignedLeadsInput = {
    update: XOR<UserUpdateWithoutAssignedLeadsInput, UserUncheckedUpdateWithoutAssignedLeadsInput>
    create: XOR<UserCreateWithoutAssignedLeadsInput, UserUncheckedCreateWithoutAssignedLeadsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAssignedLeadsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAssignedLeadsInput, UserUncheckedUpdateWithoutAssignedLeadsInput>
  }

  export type UserUpdateWithoutAssignedLeadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    touchPoints?: TouchPointUpdateManyWithoutContactedByNestedInput
    notes?: NoteUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutAssignedLeadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    touchPoints?: TouchPointUncheckedUpdateManyWithoutContactedByNestedInput
    notes?: NoteUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type LeadUpsertWithoutReferralsInput = {
    update: XOR<LeadUpdateWithoutReferralsInput, LeadUncheckedUpdateWithoutReferralsInput>
    create: XOR<LeadCreateWithoutReferralsInput, LeadUncheckedCreateWithoutReferralsInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutReferralsInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutReferralsInput, LeadUncheckedUpdateWithoutReferralsInput>
  }

  export type LeadUpdateWithoutReferralsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    locations?: LocationUpdateManyWithoutBusinessNestedInput
    primaryLocation?: LocationUpdateOneWithoutPrimaryForBusinessNestedInput
    contacts?: ContactUpdateManyWithoutLeadNestedInput
    industry?: IndustryUpdateOneRequiredWithoutLeadsNestedInput
    businessType?: BusinessTypeUpdateOneRequiredWithoutLeadsNestedInput
    touchPoint?: TouchPointUpdateManyWithoutLeadNestedInput
    notes?: NoteUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUpdateManyWithoutLeadNestedInput
    assignedTo?: UserUpdateOneWithoutAssignedLeadsNestedInput
    referredByLead?: LeadUpdateOneWithoutReferralsNestedInput
  }

  export type LeadUncheckedUpdateWithoutReferralsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    primaryLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    industryId?: StringFieldUpdateOperationsInput | string
    businessTypeId?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    locations?: LocationUncheckedUpdateManyWithoutBusinessNestedInput
    contacts?: ContactUncheckedUpdateManyWithoutLeadNestedInput
    touchPoint?: TouchPointUncheckedUpdateManyWithoutLeadNestedInput
    notes?: NoteUncheckedUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type LeadUpsertWithWhereUniqueWithoutReferredByLeadInput = {
    where: LeadWhereUniqueInput
    update: XOR<LeadUpdateWithoutReferredByLeadInput, LeadUncheckedUpdateWithoutReferredByLeadInput>
    create: XOR<LeadCreateWithoutReferredByLeadInput, LeadUncheckedCreateWithoutReferredByLeadInput>
  }

  export type LeadUpdateWithWhereUniqueWithoutReferredByLeadInput = {
    where: LeadWhereUniqueInput
    data: XOR<LeadUpdateWithoutReferredByLeadInput, LeadUncheckedUpdateWithoutReferredByLeadInput>
  }

  export type LeadUpdateManyWithWhereWithoutReferredByLeadInput = {
    where: LeadScalarWhereInput
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyWithoutReferredByLeadInput>
  }

  export type LeadCreateWithoutContactsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
    locations?: LocationCreateNestedManyWithoutBusinessInput
    primaryLocation?: LocationCreateNestedOneWithoutPrimaryForBusinessInput
    industry: IndustryCreateNestedOneWithoutLeadsInput
    businessType: BusinessTypeCreateNestedOneWithoutLeadsInput
    touchPoint?: TouchPointCreateNestedManyWithoutLeadInput
    notes?: NoteCreateNestedManyWithoutLeadInput
    reminders?: ReminderCreateNestedManyWithoutLeadInput
    assignedTo?: UserCreateNestedOneWithoutAssignedLeadsInput
    referredByLead?: LeadCreateNestedOneWithoutReferralsInput
    referrals?: LeadCreateNestedManyWithoutReferredByLeadInput
  }

  export type LeadUncheckedCreateWithoutContactsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    primaryLocationId?: string | null
    industryId: string
    businessTypeId: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    assignedToId?: string | null
    referredByLeadId?: string | null
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
    locations?: LocationUncheckedCreateNestedManyWithoutBusinessInput
    touchPoint?: TouchPointUncheckedCreateNestedManyWithoutLeadInput
    notes?: NoteUncheckedCreateNestedManyWithoutLeadInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutLeadInput
    referrals?: LeadUncheckedCreateNestedManyWithoutReferredByLeadInput
  }

  export type LeadCreateOrConnectWithoutContactsInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutContactsInput, LeadUncheckedCreateWithoutContactsInput>
  }

  export type LeadUpsertWithoutContactsInput = {
    update: XOR<LeadUpdateWithoutContactsInput, LeadUncheckedUpdateWithoutContactsInput>
    create: XOR<LeadCreateWithoutContactsInput, LeadUncheckedCreateWithoutContactsInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutContactsInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutContactsInput, LeadUncheckedUpdateWithoutContactsInput>
  }

  export type LeadUpdateWithoutContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    locations?: LocationUpdateManyWithoutBusinessNestedInput
    primaryLocation?: LocationUpdateOneWithoutPrimaryForBusinessNestedInput
    industry?: IndustryUpdateOneRequiredWithoutLeadsNestedInput
    businessType?: BusinessTypeUpdateOneRequiredWithoutLeadsNestedInput
    touchPoint?: TouchPointUpdateManyWithoutLeadNestedInput
    notes?: NoteUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUpdateManyWithoutLeadNestedInput
    assignedTo?: UserUpdateOneWithoutAssignedLeadsNestedInput
    referredByLead?: LeadUpdateOneWithoutReferralsNestedInput
    referrals?: LeadUpdateManyWithoutReferredByLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    primaryLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    industryId?: StringFieldUpdateOperationsInput | string
    businessTypeId?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    locations?: LocationUncheckedUpdateManyWithoutBusinessNestedInput
    touchPoint?: TouchPointUncheckedUpdateManyWithoutLeadNestedInput
    notes?: NoteUncheckedUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutLeadNestedInput
    referrals?: LeadUncheckedUpdateManyWithoutReferredByLeadNestedInput
  }

  export type LeadCreateWithoutIndustryInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
    locations?: LocationCreateNestedManyWithoutBusinessInput
    primaryLocation?: LocationCreateNestedOneWithoutPrimaryForBusinessInput
    contacts?: ContactCreateNestedManyWithoutLeadInput
    businessType: BusinessTypeCreateNestedOneWithoutLeadsInput
    touchPoint?: TouchPointCreateNestedManyWithoutLeadInput
    notes?: NoteCreateNestedManyWithoutLeadInput
    reminders?: ReminderCreateNestedManyWithoutLeadInput
    assignedTo?: UserCreateNestedOneWithoutAssignedLeadsInput
    referredByLead?: LeadCreateNestedOneWithoutReferralsInput
    referrals?: LeadCreateNestedManyWithoutReferredByLeadInput
  }

  export type LeadUncheckedCreateWithoutIndustryInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    primaryLocationId?: string | null
    businessTypeId: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    assignedToId?: string | null
    referredByLeadId?: string | null
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
    locations?: LocationUncheckedCreateNestedManyWithoutBusinessInput
    contacts?: ContactUncheckedCreateNestedManyWithoutLeadInput
    touchPoint?: TouchPointUncheckedCreateNestedManyWithoutLeadInput
    notes?: NoteUncheckedCreateNestedManyWithoutLeadInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutLeadInput
    referrals?: LeadUncheckedCreateNestedManyWithoutReferredByLeadInput
  }

  export type LeadCreateOrConnectWithoutIndustryInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutIndustryInput, LeadUncheckedCreateWithoutIndustryInput>
  }

  export type LeadCreateManyIndustryInputEnvelope = {
    data: LeadCreateManyIndustryInput | LeadCreateManyIndustryInput[]
    skipDuplicates?: boolean
  }

  export type LeadUpsertWithWhereUniqueWithoutIndustryInput = {
    where: LeadWhereUniqueInput
    update: XOR<LeadUpdateWithoutIndustryInput, LeadUncheckedUpdateWithoutIndustryInput>
    create: XOR<LeadCreateWithoutIndustryInput, LeadUncheckedCreateWithoutIndustryInput>
  }

  export type LeadUpdateWithWhereUniqueWithoutIndustryInput = {
    where: LeadWhereUniqueInput
    data: XOR<LeadUpdateWithoutIndustryInput, LeadUncheckedUpdateWithoutIndustryInput>
  }

  export type LeadUpdateManyWithWhereWithoutIndustryInput = {
    where: LeadScalarWhereInput
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyWithoutIndustryInput>
  }

  export type LeadCreateWithoutBusinessTypeInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
    locations?: LocationCreateNestedManyWithoutBusinessInput
    primaryLocation?: LocationCreateNestedOneWithoutPrimaryForBusinessInput
    contacts?: ContactCreateNestedManyWithoutLeadInput
    industry: IndustryCreateNestedOneWithoutLeadsInput
    touchPoint?: TouchPointCreateNestedManyWithoutLeadInput
    notes?: NoteCreateNestedManyWithoutLeadInput
    reminders?: ReminderCreateNestedManyWithoutLeadInput
    assignedTo?: UserCreateNestedOneWithoutAssignedLeadsInput
    referredByLead?: LeadCreateNestedOneWithoutReferralsInput
    referrals?: LeadCreateNestedManyWithoutReferredByLeadInput
  }

  export type LeadUncheckedCreateWithoutBusinessTypeInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    primaryLocationId?: string | null
    industryId: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    assignedToId?: string | null
    referredByLeadId?: string | null
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
    locations?: LocationUncheckedCreateNestedManyWithoutBusinessInput
    contacts?: ContactUncheckedCreateNestedManyWithoutLeadInput
    touchPoint?: TouchPointUncheckedCreateNestedManyWithoutLeadInput
    notes?: NoteUncheckedCreateNestedManyWithoutLeadInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutLeadInput
    referrals?: LeadUncheckedCreateNestedManyWithoutReferredByLeadInput
  }

  export type LeadCreateOrConnectWithoutBusinessTypeInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutBusinessTypeInput, LeadUncheckedCreateWithoutBusinessTypeInput>
  }

  export type LeadCreateManyBusinessTypeInputEnvelope = {
    data: LeadCreateManyBusinessTypeInput | LeadCreateManyBusinessTypeInput[]
    skipDuplicates?: boolean
  }

  export type LeadUpsertWithWhereUniqueWithoutBusinessTypeInput = {
    where: LeadWhereUniqueInput
    update: XOR<LeadUpdateWithoutBusinessTypeInput, LeadUncheckedUpdateWithoutBusinessTypeInput>
    create: XOR<LeadCreateWithoutBusinessTypeInput, LeadUncheckedCreateWithoutBusinessTypeInput>
  }

  export type LeadUpdateWithWhereUniqueWithoutBusinessTypeInput = {
    where: LeadWhereUniqueInput
    data: XOR<LeadUpdateWithoutBusinessTypeInput, LeadUncheckedUpdateWithoutBusinessTypeInput>
  }

  export type LeadUpdateManyWithWhereWithoutBusinessTypeInput = {
    where: LeadScalarWhereInput
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyWithoutBusinessTypeInput>
  }

  export type LeadCreateWithoutLocationsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
    primaryLocation?: LocationCreateNestedOneWithoutPrimaryForBusinessInput
    contacts?: ContactCreateNestedManyWithoutLeadInput
    industry: IndustryCreateNestedOneWithoutLeadsInput
    businessType: BusinessTypeCreateNestedOneWithoutLeadsInput
    touchPoint?: TouchPointCreateNestedManyWithoutLeadInput
    notes?: NoteCreateNestedManyWithoutLeadInput
    reminders?: ReminderCreateNestedManyWithoutLeadInput
    assignedTo?: UserCreateNestedOneWithoutAssignedLeadsInput
    referredByLead?: LeadCreateNestedOneWithoutReferralsInput
    referrals?: LeadCreateNestedManyWithoutReferredByLeadInput
  }

  export type LeadUncheckedCreateWithoutLocationsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    primaryLocationId?: string | null
    industryId: string
    businessTypeId: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    assignedToId?: string | null
    referredByLeadId?: string | null
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
    contacts?: ContactUncheckedCreateNestedManyWithoutLeadInput
    touchPoint?: TouchPointUncheckedCreateNestedManyWithoutLeadInput
    notes?: NoteUncheckedCreateNestedManyWithoutLeadInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutLeadInput
    referrals?: LeadUncheckedCreateNestedManyWithoutReferredByLeadInput
  }

  export type LeadCreateOrConnectWithoutLocationsInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutLocationsInput, LeadUncheckedCreateWithoutLocationsInput>
  }

  export type PhoneNumberCreateWithoutLocationInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    number: string
    label?: $Enums.PhoneType | null
  }

  export type PhoneNumberUncheckedCreateWithoutLocationInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    number: string
    label?: $Enums.PhoneType | null
  }

  export type PhoneNumberCreateOrConnectWithoutLocationInput = {
    where: PhoneNumberWhereUniqueInput
    create: XOR<PhoneNumberCreateWithoutLocationInput, PhoneNumberUncheckedCreateWithoutLocationInput>
  }

  export type PhoneNumberCreateManyLocationInputEnvelope = {
    data: PhoneNumberCreateManyLocationInput | PhoneNumberCreateManyLocationInput[]
    skipDuplicates?: boolean
  }

  export type LeadCreateWithoutPrimaryLocationInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
    locations?: LocationCreateNestedManyWithoutBusinessInput
    contacts?: ContactCreateNestedManyWithoutLeadInput
    industry: IndustryCreateNestedOneWithoutLeadsInput
    businessType: BusinessTypeCreateNestedOneWithoutLeadsInput
    touchPoint?: TouchPointCreateNestedManyWithoutLeadInput
    notes?: NoteCreateNestedManyWithoutLeadInput
    reminders?: ReminderCreateNestedManyWithoutLeadInput
    assignedTo?: UserCreateNestedOneWithoutAssignedLeadsInput
    referredByLead?: LeadCreateNestedOneWithoutReferralsInput
    referrals?: LeadCreateNestedManyWithoutReferredByLeadInput
  }

  export type LeadUncheckedCreateWithoutPrimaryLocationInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    industryId: string
    businessTypeId: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    assignedToId?: string | null
    referredByLeadId?: string | null
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
    locations?: LocationUncheckedCreateNestedManyWithoutBusinessInput
    contacts?: ContactUncheckedCreateNestedManyWithoutLeadInput
    touchPoint?: TouchPointUncheckedCreateNestedManyWithoutLeadInput
    notes?: NoteUncheckedCreateNestedManyWithoutLeadInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutLeadInput
    referrals?: LeadUncheckedCreateNestedManyWithoutReferredByLeadInput
  }

  export type LeadCreateOrConnectWithoutPrimaryLocationInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutPrimaryLocationInput, LeadUncheckedCreateWithoutPrimaryLocationInput>
  }

  export type LeadUpsertWithoutLocationsInput = {
    update: XOR<LeadUpdateWithoutLocationsInput, LeadUncheckedUpdateWithoutLocationsInput>
    create: XOR<LeadCreateWithoutLocationsInput, LeadUncheckedCreateWithoutLocationsInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutLocationsInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutLocationsInput, LeadUncheckedUpdateWithoutLocationsInput>
  }

  export type LeadUpdateWithoutLocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    primaryLocation?: LocationUpdateOneWithoutPrimaryForBusinessNestedInput
    contacts?: ContactUpdateManyWithoutLeadNestedInput
    industry?: IndustryUpdateOneRequiredWithoutLeadsNestedInput
    businessType?: BusinessTypeUpdateOneRequiredWithoutLeadsNestedInput
    touchPoint?: TouchPointUpdateManyWithoutLeadNestedInput
    notes?: NoteUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUpdateManyWithoutLeadNestedInput
    assignedTo?: UserUpdateOneWithoutAssignedLeadsNestedInput
    referredByLead?: LeadUpdateOneWithoutReferralsNestedInput
    referrals?: LeadUpdateManyWithoutReferredByLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutLocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    primaryLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    industryId?: StringFieldUpdateOperationsInput | string
    businessTypeId?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    contacts?: ContactUncheckedUpdateManyWithoutLeadNestedInput
    touchPoint?: TouchPointUncheckedUpdateManyWithoutLeadNestedInput
    notes?: NoteUncheckedUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutLeadNestedInput
    referrals?: LeadUncheckedUpdateManyWithoutReferredByLeadNestedInput
  }

  export type PhoneNumberUpsertWithWhereUniqueWithoutLocationInput = {
    where: PhoneNumberWhereUniqueInput
    update: XOR<PhoneNumberUpdateWithoutLocationInput, PhoneNumberUncheckedUpdateWithoutLocationInput>
    create: XOR<PhoneNumberCreateWithoutLocationInput, PhoneNumberUncheckedCreateWithoutLocationInput>
  }

  export type PhoneNumberUpdateWithWhereUniqueWithoutLocationInput = {
    where: PhoneNumberWhereUniqueInput
    data: XOR<PhoneNumberUpdateWithoutLocationInput, PhoneNumberUncheckedUpdateWithoutLocationInput>
  }

  export type PhoneNumberUpdateManyWithWhereWithoutLocationInput = {
    where: PhoneNumberScalarWhereInput
    data: XOR<PhoneNumberUpdateManyMutationInput, PhoneNumberUncheckedUpdateManyWithoutLocationInput>
  }

  export type PhoneNumberScalarWhereInput = {
    AND?: PhoneNumberScalarWhereInput | PhoneNumberScalarWhereInput[]
    OR?: PhoneNumberScalarWhereInput[]
    NOT?: PhoneNumberScalarWhereInput | PhoneNumberScalarWhereInput[]
    id?: StringFilter<"PhoneNumber"> | string
    createdAt?: DateTimeFilter<"PhoneNumber"> | Date | string
    updatedAt?: DateTimeFilter<"PhoneNumber"> | Date | string
    number?: StringFilter<"PhoneNumber"> | string
    label?: EnumPhoneTypeNullableFilter<"PhoneNumber"> | $Enums.PhoneType | null
    locationId?: StringNullableFilter<"PhoneNumber"> | string | null
  }

  export type LeadUpsertWithoutPrimaryLocationInput = {
    update: XOR<LeadUpdateWithoutPrimaryLocationInput, LeadUncheckedUpdateWithoutPrimaryLocationInput>
    create: XOR<LeadCreateWithoutPrimaryLocationInput, LeadUncheckedCreateWithoutPrimaryLocationInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutPrimaryLocationInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutPrimaryLocationInput, LeadUncheckedUpdateWithoutPrimaryLocationInput>
  }

  export type LeadUpdateWithoutPrimaryLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    locations?: LocationUpdateManyWithoutBusinessNestedInput
    contacts?: ContactUpdateManyWithoutLeadNestedInput
    industry?: IndustryUpdateOneRequiredWithoutLeadsNestedInput
    businessType?: BusinessTypeUpdateOneRequiredWithoutLeadsNestedInput
    touchPoint?: TouchPointUpdateManyWithoutLeadNestedInput
    notes?: NoteUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUpdateManyWithoutLeadNestedInput
    assignedTo?: UserUpdateOneWithoutAssignedLeadsNestedInput
    referredByLead?: LeadUpdateOneWithoutReferralsNestedInput
    referrals?: LeadUpdateManyWithoutReferredByLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutPrimaryLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    industryId?: StringFieldUpdateOperationsInput | string
    businessTypeId?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    locations?: LocationUncheckedUpdateManyWithoutBusinessNestedInput
    contacts?: ContactUncheckedUpdateManyWithoutLeadNestedInput
    touchPoint?: TouchPointUncheckedUpdateManyWithoutLeadNestedInput
    notes?: NoteUncheckedUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutLeadNestedInput
    referrals?: LeadUncheckedUpdateManyWithoutReferredByLeadNestedInput
  }

  export type LocationCreateWithoutPhoneNumbersInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    addressLine1: string
    addressLine2?: string | null
    city: string
    state: string
    zip: string
    business: LeadCreateNestedOneWithoutLocationsInput
    primaryForBusiness?: LeadCreateNestedOneWithoutPrimaryLocationInput
  }

  export type LocationUncheckedCreateWithoutPhoneNumbersInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    businessId: string
    addressLine1: string
    addressLine2?: string | null
    city: string
    state: string
    zip: string
    primaryForBusiness?: LeadUncheckedCreateNestedOneWithoutPrimaryLocationInput
  }

  export type LocationCreateOrConnectWithoutPhoneNumbersInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutPhoneNumbersInput, LocationUncheckedCreateWithoutPhoneNumbersInput>
  }

  export type LocationUpsertWithoutPhoneNumbersInput = {
    update: XOR<LocationUpdateWithoutPhoneNumbersInput, LocationUncheckedUpdateWithoutPhoneNumbersInput>
    create: XOR<LocationCreateWithoutPhoneNumbersInput, LocationUncheckedCreateWithoutPhoneNumbersInput>
    where?: LocationWhereInput
  }

  export type LocationUpdateToOneWithWhereWithoutPhoneNumbersInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutPhoneNumbersInput, LocationUncheckedUpdateWithoutPhoneNumbersInput>
  }

  export type LocationUpdateWithoutPhoneNumbersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
    business?: LeadUpdateOneRequiredWithoutLocationsNestedInput
    primaryForBusiness?: LeadUpdateOneWithoutPrimaryLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutPhoneNumbersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    businessId?: StringFieldUpdateOperationsInput | string
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
    primaryForBusiness?: LeadUncheckedUpdateOneWithoutPrimaryLocationNestedInput
  }

  export type LeadCreateWithoutNotesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
    locations?: LocationCreateNestedManyWithoutBusinessInput
    primaryLocation?: LocationCreateNestedOneWithoutPrimaryForBusinessInput
    contacts?: ContactCreateNestedManyWithoutLeadInput
    industry: IndustryCreateNestedOneWithoutLeadsInput
    businessType: BusinessTypeCreateNestedOneWithoutLeadsInput
    touchPoint?: TouchPointCreateNestedManyWithoutLeadInput
    reminders?: ReminderCreateNestedManyWithoutLeadInput
    assignedTo?: UserCreateNestedOneWithoutAssignedLeadsInput
    referredByLead?: LeadCreateNestedOneWithoutReferralsInput
    referrals?: LeadCreateNestedManyWithoutReferredByLeadInput
  }

  export type LeadUncheckedCreateWithoutNotesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    primaryLocationId?: string | null
    industryId: string
    businessTypeId: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    assignedToId?: string | null
    referredByLeadId?: string | null
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
    locations?: LocationUncheckedCreateNestedManyWithoutBusinessInput
    contacts?: ContactUncheckedCreateNestedManyWithoutLeadInput
    touchPoint?: TouchPointUncheckedCreateNestedManyWithoutLeadInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutLeadInput
    referrals?: LeadUncheckedCreateNestedManyWithoutReferredByLeadInput
  }

  export type LeadCreateOrConnectWithoutNotesInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutNotesInput, LeadUncheckedCreateWithoutNotesInput>
  }

  export type UserCreateWithoutNotesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    email: string
    password: string
    role: $Enums.Role
    touchPoints?: TouchPointCreateNestedManyWithoutContactedByInput
    assignedLeads?: LeadCreateNestedManyWithoutAssignedToInput
  }

  export type UserUncheckedCreateWithoutNotesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    email: string
    password: string
    role: $Enums.Role
    touchPoints?: TouchPointUncheckedCreateNestedManyWithoutContactedByInput
    assignedLeads?: LeadUncheckedCreateNestedManyWithoutAssignedToInput
  }

  export type UserCreateOrConnectWithoutNotesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotesInput, UserUncheckedCreateWithoutNotesInput>
  }

  export type LeadUpsertWithoutNotesInput = {
    update: XOR<LeadUpdateWithoutNotesInput, LeadUncheckedUpdateWithoutNotesInput>
    create: XOR<LeadCreateWithoutNotesInput, LeadUncheckedCreateWithoutNotesInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutNotesInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutNotesInput, LeadUncheckedUpdateWithoutNotesInput>
  }

  export type LeadUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    locations?: LocationUpdateManyWithoutBusinessNestedInput
    primaryLocation?: LocationUpdateOneWithoutPrimaryForBusinessNestedInput
    contacts?: ContactUpdateManyWithoutLeadNestedInput
    industry?: IndustryUpdateOneRequiredWithoutLeadsNestedInput
    businessType?: BusinessTypeUpdateOneRequiredWithoutLeadsNestedInput
    touchPoint?: TouchPointUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUpdateManyWithoutLeadNestedInput
    assignedTo?: UserUpdateOneWithoutAssignedLeadsNestedInput
    referredByLead?: LeadUpdateOneWithoutReferralsNestedInput
    referrals?: LeadUpdateManyWithoutReferredByLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    primaryLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    industryId?: StringFieldUpdateOperationsInput | string
    businessTypeId?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    locations?: LocationUncheckedUpdateManyWithoutBusinessNestedInput
    contacts?: ContactUncheckedUpdateManyWithoutLeadNestedInput
    touchPoint?: TouchPointUncheckedUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutLeadNestedInput
    referrals?: LeadUncheckedUpdateManyWithoutReferredByLeadNestedInput
  }

  export type UserUpsertWithoutNotesInput = {
    update: XOR<UserUpdateWithoutNotesInput, UserUncheckedUpdateWithoutNotesInput>
    create: XOR<UserCreateWithoutNotesInput, UserUncheckedCreateWithoutNotesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotesInput, UserUncheckedUpdateWithoutNotesInput>
  }

  export type UserUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    touchPoints?: TouchPointUpdateManyWithoutContactedByNestedInput
    assignedLeads?: LeadUpdateManyWithoutAssignedToNestedInput
  }

  export type UserUncheckedUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    touchPoints?: TouchPointUncheckedUpdateManyWithoutContactedByNestedInput
    assignedLeads?: LeadUncheckedUpdateManyWithoutAssignedToNestedInput
  }

  export type LeadCreateWithoutTouchPointInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
    locations?: LocationCreateNestedManyWithoutBusinessInput
    primaryLocation?: LocationCreateNestedOneWithoutPrimaryForBusinessInput
    contacts?: ContactCreateNestedManyWithoutLeadInput
    industry: IndustryCreateNestedOneWithoutLeadsInput
    businessType: BusinessTypeCreateNestedOneWithoutLeadsInput
    notes?: NoteCreateNestedManyWithoutLeadInput
    reminders?: ReminderCreateNestedManyWithoutLeadInput
    assignedTo?: UserCreateNestedOneWithoutAssignedLeadsInput
    referredByLead?: LeadCreateNestedOneWithoutReferralsInput
    referrals?: LeadCreateNestedManyWithoutReferredByLeadInput
  }

  export type LeadUncheckedCreateWithoutTouchPointInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    primaryLocationId?: string | null
    industryId: string
    businessTypeId: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    assignedToId?: string | null
    referredByLeadId?: string | null
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
    locations?: LocationUncheckedCreateNestedManyWithoutBusinessInput
    contacts?: ContactUncheckedCreateNestedManyWithoutLeadInput
    notes?: NoteUncheckedCreateNestedManyWithoutLeadInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutLeadInput
    referrals?: LeadUncheckedCreateNestedManyWithoutReferredByLeadInput
  }

  export type LeadCreateOrConnectWithoutTouchPointInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutTouchPointInput, LeadUncheckedCreateWithoutTouchPointInput>
  }

  export type UserCreateWithoutTouchPointsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    email: string
    password: string
    role: $Enums.Role
    notes?: NoteCreateNestedManyWithoutAuthorInput
    assignedLeads?: LeadCreateNestedManyWithoutAssignedToInput
  }

  export type UserUncheckedCreateWithoutTouchPointsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    email: string
    password: string
    role: $Enums.Role
    notes?: NoteUncheckedCreateNestedManyWithoutAuthorInput
    assignedLeads?: LeadUncheckedCreateNestedManyWithoutAssignedToInput
  }

  export type UserCreateOrConnectWithoutTouchPointsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTouchPointsInput, UserUncheckedCreateWithoutTouchPointsInput>
  }

  export type ReminderCreateWithoutTouchPointInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    type: $Enums.TouchPointType
    dueDate: Date | string
    note?: string | null
    completed?: boolean
    completedAt?: Date | string | null
    isCheckIn?: boolean
    isResponseCheck?: boolean
    isEmailSentCheck?: boolean
    lead: LeadCreateNestedOneWithoutRemindersInput
  }

  export type ReminderUncheckedCreateWithoutTouchPointInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    leadId: string
    type: $Enums.TouchPointType
    dueDate: Date | string
    note?: string | null
    completed?: boolean
    completedAt?: Date | string | null
    isCheckIn?: boolean
    isResponseCheck?: boolean
    isEmailSentCheck?: boolean
  }

  export type ReminderCreateOrConnectWithoutTouchPointInput = {
    where: ReminderWhereUniqueInput
    create: XOR<ReminderCreateWithoutTouchPointInput, ReminderUncheckedCreateWithoutTouchPointInput>
  }

  export type ReminderCreateManyTouchPointInputEnvelope = {
    data: ReminderCreateManyTouchPointInput | ReminderCreateManyTouchPointInput[]
    skipDuplicates?: boolean
  }

  export type LeadUpsertWithoutTouchPointInput = {
    update: XOR<LeadUpdateWithoutTouchPointInput, LeadUncheckedUpdateWithoutTouchPointInput>
    create: XOR<LeadCreateWithoutTouchPointInput, LeadUncheckedCreateWithoutTouchPointInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutTouchPointInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutTouchPointInput, LeadUncheckedUpdateWithoutTouchPointInput>
  }

  export type LeadUpdateWithoutTouchPointInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    locations?: LocationUpdateManyWithoutBusinessNestedInput
    primaryLocation?: LocationUpdateOneWithoutPrimaryForBusinessNestedInput
    contacts?: ContactUpdateManyWithoutLeadNestedInput
    industry?: IndustryUpdateOneRequiredWithoutLeadsNestedInput
    businessType?: BusinessTypeUpdateOneRequiredWithoutLeadsNestedInput
    notes?: NoteUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUpdateManyWithoutLeadNestedInput
    assignedTo?: UserUpdateOneWithoutAssignedLeadsNestedInput
    referredByLead?: LeadUpdateOneWithoutReferralsNestedInput
    referrals?: LeadUpdateManyWithoutReferredByLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutTouchPointInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    primaryLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    industryId?: StringFieldUpdateOperationsInput | string
    businessTypeId?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    locations?: LocationUncheckedUpdateManyWithoutBusinessNestedInput
    contacts?: ContactUncheckedUpdateManyWithoutLeadNestedInput
    notes?: NoteUncheckedUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutLeadNestedInput
    referrals?: LeadUncheckedUpdateManyWithoutReferredByLeadNestedInput
  }

  export type UserUpsertWithoutTouchPointsInput = {
    update: XOR<UserUpdateWithoutTouchPointsInput, UserUncheckedUpdateWithoutTouchPointsInput>
    create: XOR<UserCreateWithoutTouchPointsInput, UserUncheckedCreateWithoutTouchPointsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTouchPointsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTouchPointsInput, UserUncheckedUpdateWithoutTouchPointsInput>
  }

  export type UserUpdateWithoutTouchPointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    notes?: NoteUpdateManyWithoutAuthorNestedInput
    assignedLeads?: LeadUpdateManyWithoutAssignedToNestedInput
  }

  export type UserUncheckedUpdateWithoutTouchPointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    notes?: NoteUncheckedUpdateManyWithoutAuthorNestedInput
    assignedLeads?: LeadUncheckedUpdateManyWithoutAssignedToNestedInput
  }

  export type ReminderUpsertWithWhereUniqueWithoutTouchPointInput = {
    where: ReminderWhereUniqueInput
    update: XOR<ReminderUpdateWithoutTouchPointInput, ReminderUncheckedUpdateWithoutTouchPointInput>
    create: XOR<ReminderCreateWithoutTouchPointInput, ReminderUncheckedCreateWithoutTouchPointInput>
  }

  export type ReminderUpdateWithWhereUniqueWithoutTouchPointInput = {
    where: ReminderWhereUniqueInput
    data: XOR<ReminderUpdateWithoutTouchPointInput, ReminderUncheckedUpdateWithoutTouchPointInput>
  }

  export type ReminderUpdateManyWithWhereWithoutTouchPointInput = {
    where: ReminderScalarWhereInput
    data: XOR<ReminderUpdateManyMutationInput, ReminderUncheckedUpdateManyWithoutTouchPointInput>
  }

  export type LeadCreateWithoutRemindersInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
    locations?: LocationCreateNestedManyWithoutBusinessInput
    primaryLocation?: LocationCreateNestedOneWithoutPrimaryForBusinessInput
    contacts?: ContactCreateNestedManyWithoutLeadInput
    industry: IndustryCreateNestedOneWithoutLeadsInput
    businessType: BusinessTypeCreateNestedOneWithoutLeadsInput
    touchPoint?: TouchPointCreateNestedManyWithoutLeadInput
    notes?: NoteCreateNestedManyWithoutLeadInput
    assignedTo?: UserCreateNestedOneWithoutAssignedLeadsInput
    referredByLead?: LeadCreateNestedOneWithoutReferralsInput
    referrals?: LeadCreateNestedManyWithoutReferredByLeadInput
  }

  export type LeadUncheckedCreateWithoutRemindersInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    primaryLocationId?: string | null
    industryId: string
    businessTypeId: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    assignedToId?: string | null
    referredByLeadId?: string | null
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
    locations?: LocationUncheckedCreateNestedManyWithoutBusinessInput
    contacts?: ContactUncheckedCreateNestedManyWithoutLeadInput
    touchPoint?: TouchPointUncheckedCreateNestedManyWithoutLeadInput
    notes?: NoteUncheckedCreateNestedManyWithoutLeadInput
    referrals?: LeadUncheckedCreateNestedManyWithoutReferredByLeadInput
  }

  export type LeadCreateOrConnectWithoutRemindersInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutRemindersInput, LeadUncheckedCreateWithoutRemindersInput>
  }

  export type TouchPointCreateWithoutRemindersInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    date: Date | string
    type: $Enums.TouchPointType
    receivedResponse?: boolean
    summary?: string | null
    sequencePosition?: $Enums.SequencePosition | null
    lead: LeadCreateNestedOneWithoutTouchPointInput
    contactedBy: UserCreateNestedOneWithoutTouchPointsInput
  }

  export type TouchPointUncheckedCreateWithoutRemindersInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    date: Date | string
    type: $Enums.TouchPointType
    leadId: string
    contactedById: string
    receivedResponse?: boolean
    summary?: string | null
    sequencePosition?: $Enums.SequencePosition | null
  }

  export type TouchPointCreateOrConnectWithoutRemindersInput = {
    where: TouchPointWhereUniqueInput
    create: XOR<TouchPointCreateWithoutRemindersInput, TouchPointUncheckedCreateWithoutRemindersInput>
  }

  export type LeadUpsertWithoutRemindersInput = {
    update: XOR<LeadUpdateWithoutRemindersInput, LeadUncheckedUpdateWithoutRemindersInput>
    create: XOR<LeadCreateWithoutRemindersInput, LeadUncheckedCreateWithoutRemindersInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutRemindersInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutRemindersInput, LeadUncheckedUpdateWithoutRemindersInput>
  }

  export type LeadUpdateWithoutRemindersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    locations?: LocationUpdateManyWithoutBusinessNestedInput
    primaryLocation?: LocationUpdateOneWithoutPrimaryForBusinessNestedInput
    contacts?: ContactUpdateManyWithoutLeadNestedInput
    industry?: IndustryUpdateOneRequiredWithoutLeadsNestedInput
    businessType?: BusinessTypeUpdateOneRequiredWithoutLeadsNestedInput
    touchPoint?: TouchPointUpdateManyWithoutLeadNestedInput
    notes?: NoteUpdateManyWithoutLeadNestedInput
    assignedTo?: UserUpdateOneWithoutAssignedLeadsNestedInput
    referredByLead?: LeadUpdateOneWithoutReferralsNestedInput
    referrals?: LeadUpdateManyWithoutReferredByLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutRemindersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    primaryLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    industryId?: StringFieldUpdateOperationsInput | string
    businessTypeId?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    locations?: LocationUncheckedUpdateManyWithoutBusinessNestedInput
    contacts?: ContactUncheckedUpdateManyWithoutLeadNestedInput
    touchPoint?: TouchPointUncheckedUpdateManyWithoutLeadNestedInput
    notes?: NoteUncheckedUpdateManyWithoutLeadNestedInput
    referrals?: LeadUncheckedUpdateManyWithoutReferredByLeadNestedInput
  }

  export type TouchPointUpsertWithoutRemindersInput = {
    update: XOR<TouchPointUpdateWithoutRemindersInput, TouchPointUncheckedUpdateWithoutRemindersInput>
    create: XOR<TouchPointCreateWithoutRemindersInput, TouchPointUncheckedCreateWithoutRemindersInput>
    where?: TouchPointWhereInput
  }

  export type TouchPointUpdateToOneWithWhereWithoutRemindersInput = {
    where?: TouchPointWhereInput
    data: XOR<TouchPointUpdateWithoutRemindersInput, TouchPointUncheckedUpdateWithoutRemindersInput>
  }

  export type TouchPointUpdateWithoutRemindersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTouchPointTypeFieldUpdateOperationsInput | $Enums.TouchPointType
    receivedResponse?: BoolFieldUpdateOperationsInput | boolean
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sequencePosition?: NullableEnumSequencePositionFieldUpdateOperationsInput | $Enums.SequencePosition | null
    lead?: LeadUpdateOneRequiredWithoutTouchPointNestedInput
    contactedBy?: UserUpdateOneRequiredWithoutTouchPointsNestedInput
  }

  export type TouchPointUncheckedUpdateWithoutRemindersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTouchPointTypeFieldUpdateOperationsInput | $Enums.TouchPointType
    leadId?: StringFieldUpdateOperationsInput | string
    contactedById?: StringFieldUpdateOperationsInput | string
    receivedResponse?: BoolFieldUpdateOperationsInput | boolean
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sequencePosition?: NullableEnumSequencePositionFieldUpdateOperationsInput | $Enums.SequencePosition | null
  }

  export type TouchPointCreateManyContactedByInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    date: Date | string
    type: $Enums.TouchPointType
    leadId: string
    receivedResponse?: boolean
    summary?: string | null
    sequencePosition?: $Enums.SequencePosition | null
  }

  export type NoteCreateManyAuthorInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    text: string
    leadId: string
  }

  export type LeadCreateManyAssignedToInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    primaryLocationId?: string | null
    industryId: string
    businessTypeId: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    referredByLeadId?: string | null
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
  }

  export type TouchPointUpdateWithoutContactedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTouchPointTypeFieldUpdateOperationsInput | $Enums.TouchPointType
    receivedResponse?: BoolFieldUpdateOperationsInput | boolean
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sequencePosition?: NullableEnumSequencePositionFieldUpdateOperationsInput | $Enums.SequencePosition | null
    lead?: LeadUpdateOneRequiredWithoutTouchPointNestedInput
    reminders?: ReminderUpdateManyWithoutTouchPointNestedInput
  }

  export type TouchPointUncheckedUpdateWithoutContactedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTouchPointTypeFieldUpdateOperationsInput | $Enums.TouchPointType
    leadId?: StringFieldUpdateOperationsInput | string
    receivedResponse?: BoolFieldUpdateOperationsInput | boolean
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sequencePosition?: NullableEnumSequencePositionFieldUpdateOperationsInput | $Enums.SequencePosition | null
    reminders?: ReminderUncheckedUpdateManyWithoutTouchPointNestedInput
  }

  export type TouchPointUncheckedUpdateManyWithoutContactedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTouchPointTypeFieldUpdateOperationsInput | $Enums.TouchPointType
    leadId?: StringFieldUpdateOperationsInput | string
    receivedResponse?: BoolFieldUpdateOperationsInput | boolean
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sequencePosition?: NullableEnumSequencePositionFieldUpdateOperationsInput | $Enums.SequencePosition | null
  }

  export type NoteUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    lead?: LeadUpdateOneRequiredWithoutNotesNestedInput
  }

  export type NoteUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
  }

  export type NoteUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
  }

  export type LeadUpdateWithoutAssignedToInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    locations?: LocationUpdateManyWithoutBusinessNestedInput
    primaryLocation?: LocationUpdateOneWithoutPrimaryForBusinessNestedInput
    contacts?: ContactUpdateManyWithoutLeadNestedInput
    industry?: IndustryUpdateOneRequiredWithoutLeadsNestedInput
    businessType?: BusinessTypeUpdateOneRequiredWithoutLeadsNestedInput
    touchPoint?: TouchPointUpdateManyWithoutLeadNestedInput
    notes?: NoteUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUpdateManyWithoutLeadNestedInput
    referredByLead?: LeadUpdateOneWithoutReferralsNestedInput
    referrals?: LeadUpdateManyWithoutReferredByLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutAssignedToInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    primaryLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    industryId?: StringFieldUpdateOperationsInput | string
    businessTypeId?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    referredByLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    locations?: LocationUncheckedUpdateManyWithoutBusinessNestedInput
    contacts?: ContactUncheckedUpdateManyWithoutLeadNestedInput
    touchPoint?: TouchPointUncheckedUpdateManyWithoutLeadNestedInput
    notes?: NoteUncheckedUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutLeadNestedInput
    referrals?: LeadUncheckedUpdateManyWithoutReferredByLeadNestedInput
  }

  export type LeadUncheckedUpdateManyWithoutAssignedToInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    primaryLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    industryId?: StringFieldUpdateOperationsInput | string
    businessTypeId?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    referredByLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type LocationCreateManyBusinessInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    addressLine1: string
    addressLine2?: string | null
    city: string
    state: string
    zip: string
  }

  export type ContactCreateManyLeadInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    title?: string | null
    email?: string | null
    phone?: string | null
    isDecisionMaker?: boolean
    notes?: string | null
  }

  export type TouchPointCreateManyLeadInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    date: Date | string
    type: $Enums.TouchPointType
    contactedById: string
    receivedResponse?: boolean
    summary?: string | null
    sequencePosition?: $Enums.SequencePosition | null
  }

  export type NoteCreateManyLeadInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    text: string
    userId: string
  }

  export type ReminderCreateManyLeadInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    touchPointId?: string | null
    type: $Enums.TouchPointType
    dueDate: Date | string
    note?: string | null
    completed?: boolean
    completedAt?: Date | string | null
    isCheckIn?: boolean
    isResponseCheck?: boolean
    isEmailSentCheck?: boolean
  }

  export type LeadCreateManyReferredByLeadInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    primaryLocationId?: string | null
    industryId: string
    businessTypeId: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    assignedToId?: string | null
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
  }

  export type LocationUpdateWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
    phoneNumbers?: PhoneNumberUpdateManyWithoutLocationNestedInput
    primaryForBusiness?: LeadUpdateOneWithoutPrimaryLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
    phoneNumbers?: PhoneNumberUncheckedUpdateManyWithoutLocationNestedInput
    primaryForBusiness?: LeadUncheckedUpdateOneWithoutPrimaryLocationNestedInput
  }

  export type LocationUncheckedUpdateManyWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    zip?: StringFieldUpdateOperationsInput | string
  }

  export type ContactUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isDecisionMaker?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ContactUncheckedUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isDecisionMaker?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ContactUncheckedUpdateManyWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isDecisionMaker?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TouchPointUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTouchPointTypeFieldUpdateOperationsInput | $Enums.TouchPointType
    receivedResponse?: BoolFieldUpdateOperationsInput | boolean
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sequencePosition?: NullableEnumSequencePositionFieldUpdateOperationsInput | $Enums.SequencePosition | null
    contactedBy?: UserUpdateOneRequiredWithoutTouchPointsNestedInput
    reminders?: ReminderUpdateManyWithoutTouchPointNestedInput
  }

  export type TouchPointUncheckedUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTouchPointTypeFieldUpdateOperationsInput | $Enums.TouchPointType
    contactedById?: StringFieldUpdateOperationsInput | string
    receivedResponse?: BoolFieldUpdateOperationsInput | boolean
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sequencePosition?: NullableEnumSequencePositionFieldUpdateOperationsInput | $Enums.SequencePosition | null
    reminders?: ReminderUncheckedUpdateManyWithoutTouchPointNestedInput
  }

  export type TouchPointUncheckedUpdateManyWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTouchPointTypeFieldUpdateOperationsInput | $Enums.TouchPointType
    contactedById?: StringFieldUpdateOperationsInput | string
    receivedResponse?: BoolFieldUpdateOperationsInput | boolean
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sequencePosition?: NullableEnumSequencePositionFieldUpdateOperationsInput | $Enums.SequencePosition | null
  }

  export type NoteUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    author?: UserUpdateOneRequiredWithoutNotesNestedInput
  }

  export type NoteUncheckedUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type NoteUncheckedUpdateManyWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    text?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ReminderUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTouchPointTypeFieldUpdateOperationsInput | $Enums.TouchPointType
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCheckIn?: BoolFieldUpdateOperationsInput | boolean
    isResponseCheck?: BoolFieldUpdateOperationsInput | boolean
    isEmailSentCheck?: BoolFieldUpdateOperationsInput | boolean
    touchPoint?: TouchPointUpdateOneWithoutRemindersNestedInput
  }

  export type ReminderUncheckedUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    touchPointId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTouchPointTypeFieldUpdateOperationsInput | $Enums.TouchPointType
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCheckIn?: BoolFieldUpdateOperationsInput | boolean
    isResponseCheck?: BoolFieldUpdateOperationsInput | boolean
    isEmailSentCheck?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ReminderUncheckedUpdateManyWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    touchPointId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTouchPointTypeFieldUpdateOperationsInput | $Enums.TouchPointType
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCheckIn?: BoolFieldUpdateOperationsInput | boolean
    isResponseCheck?: BoolFieldUpdateOperationsInput | boolean
    isEmailSentCheck?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LeadUpdateWithoutReferredByLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    locations?: LocationUpdateManyWithoutBusinessNestedInput
    primaryLocation?: LocationUpdateOneWithoutPrimaryForBusinessNestedInput
    contacts?: ContactUpdateManyWithoutLeadNestedInput
    industry?: IndustryUpdateOneRequiredWithoutLeadsNestedInput
    businessType?: BusinessTypeUpdateOneRequiredWithoutLeadsNestedInput
    touchPoint?: TouchPointUpdateManyWithoutLeadNestedInput
    notes?: NoteUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUpdateManyWithoutLeadNestedInput
    assignedTo?: UserUpdateOneWithoutAssignedLeadsNestedInput
    referrals?: LeadUpdateManyWithoutReferredByLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutReferredByLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    primaryLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    industryId?: StringFieldUpdateOperationsInput | string
    businessTypeId?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    locations?: LocationUncheckedUpdateManyWithoutBusinessNestedInput
    contacts?: ContactUncheckedUpdateManyWithoutLeadNestedInput
    touchPoint?: TouchPointUncheckedUpdateManyWithoutLeadNestedInput
    notes?: NoteUncheckedUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutLeadNestedInput
    referrals?: LeadUncheckedUpdateManyWithoutReferredByLeadNestedInput
  }

  export type LeadUncheckedUpdateManyWithoutReferredByLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    primaryLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    industryId?: StringFieldUpdateOperationsInput | string
    businessTypeId?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type LeadCreateManyIndustryInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    primaryLocationId?: string | null
    businessTypeId: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    assignedToId?: string | null
    referredByLeadId?: string | null
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
  }

  export type LeadUpdateWithoutIndustryInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    locations?: LocationUpdateManyWithoutBusinessNestedInput
    primaryLocation?: LocationUpdateOneWithoutPrimaryForBusinessNestedInput
    contacts?: ContactUpdateManyWithoutLeadNestedInput
    businessType?: BusinessTypeUpdateOneRequiredWithoutLeadsNestedInput
    touchPoint?: TouchPointUpdateManyWithoutLeadNestedInput
    notes?: NoteUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUpdateManyWithoutLeadNestedInput
    assignedTo?: UserUpdateOneWithoutAssignedLeadsNestedInput
    referredByLead?: LeadUpdateOneWithoutReferralsNestedInput
    referrals?: LeadUpdateManyWithoutReferredByLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutIndustryInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    primaryLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    businessTypeId?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    locations?: LocationUncheckedUpdateManyWithoutBusinessNestedInput
    contacts?: ContactUncheckedUpdateManyWithoutLeadNestedInput
    touchPoint?: TouchPointUncheckedUpdateManyWithoutLeadNestedInput
    notes?: NoteUncheckedUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutLeadNestedInput
    referrals?: LeadUncheckedUpdateManyWithoutReferredByLeadNestedInput
  }

  export type LeadUncheckedUpdateManyWithoutIndustryInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    primaryLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    businessTypeId?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type LeadCreateManyBusinessTypeInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    business: string
    primaryLocationId?: string | null
    industryId: string
    igHandle?: string | null
    igFollowerCount?: number | null
    email?: string | null
    website?: string | null
    pipelineStage?: $Enums.PipelineStage
    source?: $Enums.LeadSource | null
    discoveredVia?: $Enums.DiscoveredVia | null
    discoveredViaOther?: string | null
    convertedAt?: Date | string | null
    isBlackOwned?: boolean
    isWomanOwned?: boolean
    isLatinoOwned?: boolean
    isImmigrantOwned?: boolean
    priority?: $Enums.Priority | null
    sequenceStep?: number
    sequenceActive?: boolean
    isHot?: boolean
    assignedToId?: string | null
    referredByLeadId?: string | null
    referredByName?: string | null
    instagramHandle?: string | null
    instagramFollowers?: number | null
    tiktokHandle?: string | null
    tiktokFollowers?: number | null
    youtubeHandle?: string | null
    youtubeFollowers?: number | null
    facebookHandle?: string | null
    facebookFollowers?: number | null
  }

  export type LeadUpdateWithoutBusinessTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    locations?: LocationUpdateManyWithoutBusinessNestedInput
    primaryLocation?: LocationUpdateOneWithoutPrimaryForBusinessNestedInput
    contacts?: ContactUpdateManyWithoutLeadNestedInput
    industry?: IndustryUpdateOneRequiredWithoutLeadsNestedInput
    touchPoint?: TouchPointUpdateManyWithoutLeadNestedInput
    notes?: NoteUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUpdateManyWithoutLeadNestedInput
    assignedTo?: UserUpdateOneWithoutAssignedLeadsNestedInput
    referredByLead?: LeadUpdateOneWithoutReferralsNestedInput
    referrals?: LeadUpdateManyWithoutReferredByLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutBusinessTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    primaryLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    industryId?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    locations?: LocationUncheckedUpdateManyWithoutBusinessNestedInput
    contacts?: ContactUncheckedUpdateManyWithoutLeadNestedInput
    touchPoint?: TouchPointUncheckedUpdateManyWithoutLeadNestedInput
    notes?: NoteUncheckedUpdateManyWithoutLeadNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutLeadNestedInput
    referrals?: LeadUncheckedUpdateManyWithoutReferredByLeadNestedInput
  }

  export type LeadUncheckedUpdateManyWithoutBusinessTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: StringFieldUpdateOperationsInput | string
    primaryLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    industryId?: StringFieldUpdateOperationsInput | string
    igHandle?: NullableStringFieldUpdateOperationsInput | string | null
    igFollowerCount?: NullableIntFieldUpdateOperationsInput | number | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    pipelineStage?: EnumPipelineStageFieldUpdateOperationsInput | $Enums.PipelineStage
    source?: NullableEnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource | null
    discoveredVia?: NullableEnumDiscoveredViaFieldUpdateOperationsInput | $Enums.DiscoveredVia | null
    discoveredViaOther?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isBlackOwned?: BoolFieldUpdateOperationsInput | boolean
    isWomanOwned?: BoolFieldUpdateOperationsInput | boolean
    isLatinoOwned?: BoolFieldUpdateOperationsInput | boolean
    isImmigrantOwned?: BoolFieldUpdateOperationsInput | boolean
    priority?: NullableEnumPriorityFieldUpdateOperationsInput | $Enums.Priority | null
    sequenceStep?: IntFieldUpdateOperationsInput | number
    sequenceActive?: BoolFieldUpdateOperationsInput | boolean
    isHot?: BoolFieldUpdateOperationsInput | boolean
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    referredByName?: NullableStringFieldUpdateOperationsInput | string | null
    instagramHandle?: NullableStringFieldUpdateOperationsInput | string | null
    instagramFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    tiktokHandle?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    youtubeHandle?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeFollowers?: NullableIntFieldUpdateOperationsInput | number | null
    facebookHandle?: NullableStringFieldUpdateOperationsInput | string | null
    facebookFollowers?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PhoneNumberCreateManyLocationInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    number: string
    label?: $Enums.PhoneType | null
  }

  export type PhoneNumberUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    number?: StringFieldUpdateOperationsInput | string
    label?: NullableEnumPhoneTypeFieldUpdateOperationsInput | $Enums.PhoneType | null
  }

  export type PhoneNumberUncheckedUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    number?: StringFieldUpdateOperationsInput | string
    label?: NullableEnumPhoneTypeFieldUpdateOperationsInput | $Enums.PhoneType | null
  }

  export type PhoneNumberUncheckedUpdateManyWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    number?: StringFieldUpdateOperationsInput | string
    label?: NullableEnumPhoneTypeFieldUpdateOperationsInput | $Enums.PhoneType | null
  }

  export type ReminderCreateManyTouchPointInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    leadId: string
    type: $Enums.TouchPointType
    dueDate: Date | string
    note?: string | null
    completed?: boolean
    completedAt?: Date | string | null
    isCheckIn?: boolean
    isResponseCheck?: boolean
    isEmailSentCheck?: boolean
  }

  export type ReminderUpdateWithoutTouchPointInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTouchPointTypeFieldUpdateOperationsInput | $Enums.TouchPointType
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCheckIn?: BoolFieldUpdateOperationsInput | boolean
    isResponseCheck?: BoolFieldUpdateOperationsInput | boolean
    isEmailSentCheck?: BoolFieldUpdateOperationsInput | boolean
    lead?: LeadUpdateOneRequiredWithoutRemindersNestedInput
  }

  export type ReminderUncheckedUpdateWithoutTouchPointInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leadId?: StringFieldUpdateOperationsInput | string
    type?: EnumTouchPointTypeFieldUpdateOperationsInput | $Enums.TouchPointType
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCheckIn?: BoolFieldUpdateOperationsInput | boolean
    isResponseCheck?: BoolFieldUpdateOperationsInput | boolean
    isEmailSentCheck?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ReminderUncheckedUpdateManyWithoutTouchPointInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leadId?: StringFieldUpdateOperationsInput | string
    type?: EnumTouchPointTypeFieldUpdateOperationsInput | $Enums.TouchPointType
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCheckIn?: BoolFieldUpdateOperationsInput | boolean
    isResponseCheck?: BoolFieldUpdateOperationsInput | boolean
    isEmailSentCheck?: BoolFieldUpdateOperationsInput | boolean
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