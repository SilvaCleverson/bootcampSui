module cronocapilar::profile {

use sui::object::{Self, UID, ID};
use sui::tx_context::{Self, TxContext};

/// Struct que representa o perfil de cuidados capilares
struct Profile has key, store {
    id: UID,
    hair_type: vector<u8>,      // Tipo de cabelo (liso, ondulado, cacheado, crespo)
    hair_length: vector<u8>,    // Comprimento em cm
    hair_texture: vector<u8>,    // Textura (oleoso, seco, normal, misto)
    owner: address,              // Endereço do dono do perfil
    created_at: u64,            // Timestamp de criação
}

/// Evento emitido quando um perfil é criado
#[ext(event)]
#[allow(unused_field)]
struct ProfileCreated has drop {
    profile_id: ID,
    owner: address,
}

/// Função para criar um novo perfil
public fun create_profile(
    hair_type: vector<u8>,
    hair_length: vector<u8>,
    hair_texture: vector<u8>,
    ctx: &mut TxContext
): Profile {
    let owner = tx_context::sender(ctx);
    let timestamp = tx_context::epoch_timestamp_ms(ctx);
    
    let profile = Profile {
        id: object::new(ctx),
        hair_type,
        hair_length,
        hair_texture,
        owner,
        created_at: timestamp,
    };
    
    profile
}

/// Função para atualizar o tipo de cabelo
public fun update_hair_type(
    profile: &mut Profile,
    new_hair_type: vector<u8>,
) {
    profile.hair_type = new_hair_type;
}

/// Função para atualizar o comprimento do cabelo
public fun update_hair_length(
    profile: &mut Profile,
    new_hair_length: vector<u8>,
) {
    profile.hair_length = new_hair_length;
}

/// Função para atualizar a textura do cabelo
public fun update_hair_texture(
    profile: &mut Profile,
    new_hair_texture: vector<u8>,
) {
    profile.hair_texture = new_hair_texture;
}

/// Função para obter o tipo de cabelo
public fun get_hair_type(profile: &Profile): vector<u8> {
    profile.hair_type
}

/// Função para obter o comprimento do cabelo
public fun get_hair_length(profile: &Profile): vector<u8> {
    profile.hair_length
}

/// Função para obter a textura do cabelo
public fun get_hair_texture(profile: &Profile): vector<u8> {
    profile.hair_texture
}

/// Função para obter o dono do perfil
public fun get_owner(profile: &Profile): address {
    profile.owner
}

/// Função para obter a data de criação
public fun get_created_at(profile: &Profile): u64 {
    profile.created_at
}

/// Struct que representa um tratamento capilar
struct Treatment has key, store {
    id: UID,
    treatment_type: vector<u8>,    // Tipo: hydration, nutrition, reconstruction
    owner: address,                 // Endereço do dono do tratamento
    timestamp: u64,                 // Timestamp do tratamento
}

/// Evento emitido quando um tratamento é registrado
#[ext(event)]
#[allow(unused_field)]
struct TreatmentRegistered has drop {
    treatment_id: ID,
    treatment_type: vector<u8>,
    owner: address,
}

/// Função para registrar um tratamento capilar
public fun register_treatment(
    treatment_type: vector<u8>,
    ctx: &mut TxContext
): Treatment {
    let owner = tx_context::sender(ctx);
    let timestamp = tx_context::epoch_timestamp_ms(ctx);
    
    let treatment = Treatment {
        id: object::new(ctx),
        treatment_type,
        owner,
        timestamp,
    };
    
    treatment
}

/// Função para obter o tipo de tratamento
public fun get_treatment_type(treatment: &Treatment): vector<u8> {
    treatment.treatment_type
}

/// Função para obter o dono do tratamento
public fun get_treatment_owner(treatment: &Treatment): address {
    treatment.owner
}

/// Função para obter o timestamp do tratamento
public fun get_treatment_timestamp(treatment: &Treatment): u64 {
    treatment.timestamp
}

/// Struct que representa um evento capilar (Big Chop, Corte, Coloração, Tratamento)
struct Event has key, store {
    id: UID,
    event_type: vector<u8>,        // Tipo: bigchop, haircut, coloration, treatment
    date: vector<u8>,                // Data do evento (formato ISO)
    description: vector<u8>,        // Descrição/observações
    materials: vector<u8>,           // Materiais utilizados (separados por vírgula)
    location: vector<u8>,            // Local onde foi feito
    cm_cut: vector<u8>,             // Centímetros cortados (apenas para corte)
    owner: address,                  // Endereço do dono do evento
    timestamp: u64,                  // Timestamp de registro
}

/// Evento emitido quando um evento é registrado
#[ext(event)]
#[allow(unused_field)]
struct EventRegistered has drop {
    event_id: ID,
    event_type: vector<u8>,
    owner: address,
}

/// Função para registrar um evento capilar
public fun register_event(
    event_type: vector<u8>,
    date: vector<u8>,
    description: vector<u8>,
    materials: vector<u8>,
    location: vector<u8>,
    cm_cut: vector<u8>,
    ctx: &mut TxContext
): Event {
    let owner = tx_context::sender(ctx);
    let timestamp = tx_context::epoch_timestamp_ms(ctx);
    
    let event = Event {
        id: object::new(ctx),
        event_type,
        date,
        description,
        materials,
        location,
        cm_cut,
        owner,
        timestamp,
    };
    
    event
}

/// Função para obter o tipo de evento
public fun get_event_type(event: &Event): vector<u8> {
    event.event_type
}

/// Função para obter a data do evento
public fun get_event_date(event: &Event): vector<u8> {
    event.date
}

/// Função para obter o dono do evento
public fun get_event_owner(event: &Event): address {
    event.owner
}

/// Função para obter o timestamp do evento
public fun get_event_timestamp(event: &Event): u64 {
    event.timestamp
}

}