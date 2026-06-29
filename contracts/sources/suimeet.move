module suimeet::room {
    use sui::object::{Self, UID, ID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::event;
    use std::string::{String};

    /// Represents a decentralized meeting room
    public struct MeetingRoom has key, store {
        id: UID,
        title: String,
        host: address,
        is_active: bool,
    }

    /// Event emitted when a new meeting room is created
    public struct RoomCreatedEvent has copy, drop {
        room_id: ID,
        title: String,
        host: address,
    }

    /// Event emitted when a recording is submitted
    public struct RecordingSubmittedEvent has copy, drop {
        room_id: ID,
        blob_id: String,
        submitter: address,
    }

    /// Event emitted for WebRTC signaling (Offer, Answer, ICE Candidate)
    public struct SignalEvent has copy, drop {
        room_id: ID,
        sender: address,
        recipient: address, // Set to 0x0 if broadcasting to all in the room
        signal_type: u8,    // 0: Offer, 1: Answer, 2: ICE Candidate
        payload: vector<u8>,
    }

    /// Create a new meeting room
    public entry fun create_room(title: String, ctx: &mut TxContext) {
        let id = object::new(ctx);
        let room_id = object::uid_to_inner(&id);
        let host = tx_context::sender(ctx);

        let room = MeetingRoom {
            id,
            title,
            host,
            is_active: true,
        };

        event::emit(RoomCreatedEvent {
            room_id,
            title,
            host,
        });

        transfer::public_share_object(room);
    }

    /// End a meeting room (only host)
    public entry fun end_room(room: &mut MeetingRoom, ctx: &mut TxContext) {
        assert!(tx_context::sender(ctx) == room.host, 0); // ENotHost
        room.is_active = false;
    }

    /// Send a WebRTC signal to the room
    public entry fun send_signal(
        room: &MeetingRoom, 
        recipient: address, 
        signal_type: u8, 
        payload: vector<u8>, 
        ctx: &TxContext
    ) {
        assert!(room.is_active, 1); // ERoomNotActive
        assert!(signal_type <= 2, 2); // EInvalidSignalType

        event::emit(SignalEvent {
            room_id: object::id(room),
            sender: tx_context::sender(ctx),
            recipient,
            signal_type,
            payload,
        });
    }

    /// Submit a recording blob ID to the room
    public entry fun submit_recording(
        room: &mut MeetingRoom,
        blob_id: String,
        ctx: &mut TxContext
    ) {
        // Anyone in the room can submit a recording for now, or we could restrict to host.
        // Let's allow anyone to submit their local recording.
        assert!(room.is_active, 1); // ERoomNotActive

        event::emit(RecordingSubmittedEvent {
            room_id: object::id(room),
            blob_id,
            submitter: tx_context::sender(ctx),
        });
    }
}
