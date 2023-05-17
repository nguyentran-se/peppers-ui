/**
 * @param theirHandler User-supplied event handler
 * @param ourHandler Library-supplied event handler
 */
export function composeEventHandlers<EventType extends React.SyntheticEvent | Event>(
  theirHandler: ((event: EventType) => any) | undefined,
  ourHandler: (event: EventType) => any,
): (event: EventType) => any {
  return (event) => {
    theirHandler && theirHandler(event);
    // if (!event.defaultPrevented) {
    ourHandler(event);
    // }
  };
}
