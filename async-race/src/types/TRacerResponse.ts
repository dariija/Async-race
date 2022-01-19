type TRacerResponse = Promise<
    | Error
    | {
          name: string;
          id: number;
          time: number;
      }
>;

export default TRacerResponse;
