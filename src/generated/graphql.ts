import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { MyContext } from '../graphql/context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  JSON: any;
  JSONObject: any;
};

export enum AudienceRole {
  Audience = 'audience',
  Owner = 'owner',
  Speaker = 'speaker'
}

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type CreateRoomInput = {
  comunityId?: InputMaybe<Scalars['Int']>;
  creatorId: Scalars['Int'];
  description?: InputMaybe<Scalars['String']>;
  guestIds?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  hostIds?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  password?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<RoomStatus>;
  thumbUrl?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  topic?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  type?: InputMaybe<RoomType>;
};

export type EditLiveRoomInput = {
  description?: InputMaybe<Scalars['String']>;
  freeMic?: InputMaybe<Scalars['Boolean']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  muteAll?: InputMaybe<Scalars['Boolean']>;
  notification?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  seatLocked?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<RoomType>;
};

export enum Gender {
  Boy = 'boy',
  Girl = 'girl'
}

export type GetLiveRoom = {
  __typename?: 'GetLiveRoom';
  result?: Maybe<Array<Maybe<Room>>>;
  total?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']>;
  createRoom?: Maybe<Room>;
  editLiveRoom?: Maybe<Room>;
  editUser?: Maybe<User>;
  joinRoom?: Maybe<RoomAudience>;
  leaveRoom?: Maybe<Scalars['Boolean']>;
  sendMessage?: Maybe<RoomMessage>;
  startLive?: Maybe<RoomWithToken>;
  stopLive?: Maybe<Room>;
  updateAudience?: Maybe<RoomAudience>;
};


export type MutationCreateRoomArgs = {
  input: CreateRoomInput;
};


export type MutationEditLiveRoomArgs = {
  id: Scalars['Int'];
  input: EditLiveRoomInput;
};


export type MutationEditUserArgs = {
  input: UpdateUserInput;
};


export type MutationJoinRoomArgs = {
  id: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
};


export type MutationLeaveRoomArgs = {
  roomId: Scalars['Int'];
};


export type MutationSendMessageArgs = {
  input?: InputMaybe<RoomMessageInput>;
  roomId: Scalars['Int'];
};


export type MutationStartLiveArgs = {
  id: Scalars['Int'];
};


export type MutationStopLiveArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateAudienceArgs = {
  input?: InputMaybe<UpdateAudienceInput>;
  roomId: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']>;
  getLiveRoom?: Maybe<GetLiveRoom>;
  getLiveStream?: Maybe<RoomWithToken>;
  getRoomAudience?: Maybe<Array<Maybe<RoomAudience>>>;
  me?: Maybe<User>;
  room?: Maybe<Room>;
  user?: Maybe<User>;
};


export type QueryGetLiveStreamArgs = {
  roomId: Scalars['Int'];
};


export type QueryGetRoomAudienceArgs = {
  roomId: Scalars['Int'];
};


export type QueryRoomArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['Int']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Room = {
  __typename?: 'Room';
  allowChat?: Maybe<Scalars['Boolean']>;
  audience?: Maybe<Array<Maybe<RoomAudience>>>;
  creator?: Maybe<User>;
  creatorId: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['Date']>;
  freeMic?: Maybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  imageUrl?: Maybe<Scalars['String']>;
  mode?: Maybe<RoomMode>;
  notification?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  playbackId?: Maybe<Scalars['String']>;
  seatLocked?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Date']>;
  status?: Maybe<RoomStatus>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<RoomType>;
};

export type RoomAudience = {
  __typename?: 'RoomAudience';
  id: Scalars['Int'];
  isHandUp?: Maybe<Scalars['Boolean']>;
  isInRoom?: Maybe<Scalars['Boolean']>;
  isMuted?: Maybe<Scalars['Boolean']>;
  role?: Maybe<AudienceRole>;
  roomId: Scalars['Int'];
  seat?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
  userId: Scalars['Int'];
};

export type RoomMessage = {
  __typename?: 'RoomMessage';
  id?: Maybe<Scalars['String']>;
  room?: Maybe<Room>;
  sender?: Maybe<User>;
  text?: Maybe<Scalars['String']>;
};

export type RoomMessageInput = {
  text?: InputMaybe<Scalars['String']>;
};

export enum RoomMode {
  ChaseImage = 'chaseImage',
  Pairing = 'pairing',
  Question = 'question'
}

export enum RoomStatus {
  Close = 'close',
  Live = 'live',
  Open = 'open'
}

export enum RoomType {
  Community = 'community',
  Private = 'private',
  Public = 'public'
}

export type RoomWithToken = {
  __typename?: 'RoomWithToken';
  room?: Maybe<Room>;
  token?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  _?: Maybe<Scalars['Boolean']>;
  audienceChanged: RoomAudience;
  messageAdded?: Maybe<RoomMessage>;
  roomChanged: Room;
};


export type SubscriptionAudienceChangedArgs = {
  roomId: Scalars['Int'];
};


export type SubscriptionMessageAddedArgs = {
  roomId: Scalars['Int'];
};


export type SubscriptionRoomChangedArgs = {
  roomId: Scalars['Int'];
};

export type UpdateAudienceInput = {
  isHandUp?: InputMaybe<Scalars['Boolean']>;
  isInRoom?: InputMaybe<Scalars['Boolean']>;
  isMuted?: InputMaybe<Scalars['Boolean']>;
  role?: InputMaybe<AudienceRole>;
  seat?: InputMaybe<Scalars['Int']>;
};

export type UpdateUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  birthDay?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  favorite?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  job?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  school?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  bannerUrl?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  birthDay?: Maybe<Scalars['Date']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  emailConfirmed?: Maybe<Scalars['Boolean']>;
  favorite?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  id: Scalars['Int'];
  job?: Maybe<Scalars['String']>;
  lastActive?: Maybe<Scalars['Date']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  school?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AudienceRole: AudienceRole;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CacheControlScope: CacheControlScope;
  CreateRoomInput: CreateRoomInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  EditLiveRoomInput: EditLiveRoomInput;
  Gender: Gender;
  GetLiveRoom: ResolverTypeWrapper<GetLiveRoom>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Room: ResolverTypeWrapper<Room>;
  RoomAudience: ResolverTypeWrapper<RoomAudience>;
  RoomMessage: ResolverTypeWrapper<RoomMessage>;
  RoomMessageInput: RoomMessageInput;
  RoomMode: RoomMode;
  RoomStatus: RoomStatus;
  RoomType: RoomType;
  RoomWithToken: ResolverTypeWrapper<RoomWithToken>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  UpdateAudienceInput: UpdateAudienceInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  CreateRoomInput: CreateRoomInput;
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  EditLiveRoomInput: EditLiveRoomInput;
  GetLiveRoom: GetLiveRoom;
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  Mutation: {};
  Query: {};
  Room: Room;
  RoomAudience: RoomAudience;
  RoomMessage: RoomMessage;
  RoomMessageInput: RoomMessageInput;
  RoomWithToken: RoomWithToken;
  String: Scalars['String'];
  Subscription: {};
  UpdateAudienceInput: UpdateAudienceInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
}>;

export type CacheControlDirectiveArgs = {
  inheritMaxAge?: Maybe<Scalars['Boolean']>;
  maxAge?: Maybe<Scalars['Int']>;
  scope?: Maybe<CacheControlScope>;
};

export type CacheControlDirectiveResolver<Result, Parent, ContextType = MyContext, Args = CacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type GetLiveRoomResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['GetLiveRoom'] = ResolversParentTypes['GetLiveRoom']> = ResolversObject<{
  result?: Resolver<Maybe<Array<Maybe<ResolversTypes['Room']>>>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createRoom?: Resolver<Maybe<ResolversTypes['Room']>, ParentType, ContextType, RequireFields<MutationCreateRoomArgs, 'input'>>;
  editLiveRoom?: Resolver<Maybe<ResolversTypes['Room']>, ParentType, ContextType, RequireFields<MutationEditLiveRoomArgs, 'id' | 'input'>>;
  editUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationEditUserArgs, 'input'>>;
  joinRoom?: Resolver<Maybe<ResolversTypes['RoomAudience']>, ParentType, ContextType, RequireFields<MutationJoinRoomArgs, 'id'>>;
  leaveRoom?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationLeaveRoomArgs, 'roomId'>>;
  sendMessage?: Resolver<Maybe<ResolversTypes['RoomMessage']>, ParentType, ContextType, RequireFields<MutationSendMessageArgs, 'roomId'>>;
  startLive?: Resolver<Maybe<ResolversTypes['RoomWithToken']>, ParentType, ContextType, RequireFields<MutationStartLiveArgs, 'id'>>;
  stopLive?: Resolver<Maybe<ResolversTypes['Room']>, ParentType, ContextType, RequireFields<MutationStopLiveArgs, 'id'>>;
  updateAudience?: Resolver<Maybe<ResolversTypes['RoomAudience']>, ParentType, ContextType, RequireFields<MutationUpdateAudienceArgs, 'roomId'>>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  getLiveRoom?: Resolver<Maybe<ResolversTypes['GetLiveRoom']>, ParentType, ContextType>;
  getLiveStream?: Resolver<Maybe<ResolversTypes['RoomWithToken']>, ParentType, ContextType, RequireFields<QueryGetLiveStreamArgs, 'roomId'>>;
  getRoomAudience?: Resolver<Maybe<Array<Maybe<ResolversTypes['RoomAudience']>>>, ParentType, ContextType, RequireFields<QueryGetRoomAudienceArgs, 'roomId'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  room?: Resolver<Maybe<ResolversTypes['Room']>, ParentType, ContextType, RequireFields<QueryRoomArgs, 'id'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUserArgs>>;
}>;

export type RoomResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room']> = ResolversObject<{
  allowChat?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  audience?: Resolver<Maybe<Array<Maybe<ResolversTypes['RoomAudience']>>>, ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  creatorId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  end?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  freeMic?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mode?: Resolver<Maybe<ResolversTypes['RoomMode']>, ParentType, ContextType>;
  notification?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  playbackId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  seatLocked?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  start?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['RoomStatus']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['RoomType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RoomAudienceResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['RoomAudience'] = ResolversParentTypes['RoomAudience']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isHandUp?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isInRoom?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isMuted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['AudienceRole']>, ParentType, ContextType>;
  roomId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  seat?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RoomMessageResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['RoomMessage'] = ResolversParentTypes['RoomMessage']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  room?: Resolver<Maybe<ResolversTypes['Room']>, ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RoomWithTokenResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['RoomWithToken'] = ResolversParentTypes['RoomWithToken']> = ResolversObject<{
  room?: Resolver<Maybe<ResolversTypes['Room']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  _?: SubscriptionResolver<Maybe<ResolversTypes['Boolean']>, "_", ParentType, ContextType>;
  audienceChanged?: SubscriptionResolver<ResolversTypes['RoomAudience'], "audienceChanged", ParentType, ContextType, RequireFields<SubscriptionAudienceChangedArgs, 'roomId'>>;
  messageAdded?: SubscriptionResolver<Maybe<ResolversTypes['RoomMessage']>, "messageAdded", ParentType, ContextType, RequireFields<SubscriptionMessageAddedArgs, 'roomId'>>;
  roomChanged?: SubscriptionResolver<ResolversTypes['Room'], "roomChanged", ParentType, ContextType, RequireFields<SubscriptionRoomChangedArgs, 'roomId'>>;
}>;

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bannerUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthDay?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emailConfirmed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  favorite?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  job?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastActive?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  school?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  GetLiveRoom?: GetLiveRoomResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Room?: RoomResolvers<ContextType>;
  RoomAudience?: RoomAudienceResolvers<ContextType>;
  RoomMessage?: RoomMessageResolvers<ContextType>;
  RoomWithToken?: RoomWithTokenResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MyContext> = ResolversObject<{
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
}>;
